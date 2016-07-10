angular.module('Tijdhouderij.Services', ['rt.eventemitter'])

// Angular abstraction of evothings.eddystone
.factory('Eddystone', function (eventEmitter) {
    var eventHandler = {};
    eventEmitter.inject(eventHandler);

    // Interval
    var interval;
    var lastEvent; // Prevent spamming controllers

	// Dictionary of beacons.
	var beacons;
	var arrayOfBeacons;

	function stop() {
		evothings.eddystone.stopScan();
		clearInterval(interval);
	}

	function startScan(namespaceId) {
		beacons = {};

		interval = setInterval(function () {
			if ((new Date).getTime() - lastEvent >= 1000 && arrayOfBeacons) {
				eventHandler.emit('listUpdated', arrayOfBeacons);
			}
		}, 1000);

		eventHandler.emit('message', 'Started');
		evothings.eddystone.startScan(function(beacon) {
			if (beacon.nid.toString() !== (new Uint8Array([93, 195, 52, 135, 240, 46, 71, 125, 64, 88])).toString()) {
				return;
			}

			// Update beacon data.
			beacon.timeStamp = Date.now();
			if (!beacon.distance) {
				Object.defineProperty(beacon, 'distance', {
					get: function () {
						return evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi);
					}
				});
			}
			beacons[beacon.address] = beacon;

			// Remove old beacons
			var timeNow = Date.now();
			for (var key in beacons)
			{
				// Only show beacons updated during the last 60 seconds.
				var beacon = beacons[key];
				if (beacon.timeStamp + 60000 < timeNow)
				{
					delete beacons[key];
					console.log("Deleting beacon", beacon);
				}
			}

			arrayOfBeacons = [];

			for (var key in beacons) {
				if (beacons.hasOwnProperty(key)) {
					arrayOfBeacons.push(beacons[key]);
				}
			}

			arrayOfBeacons.sort(function (a, b) {
				if (a.distance === b.distance) {
					return 0;
				}
				return a.distance > b.distance ? 1 : -1;
			});

			lastEvent = (new Date).getTime();
			eventHandler.emit('listUpdated', arrayOfBeacons);
		}, function(error) {
			eventHandler.emit('error', 'Eddystone scan error: ' + error);
		});
	};

	return {
		start: startScan,
		stop: stop,
		getAll: function () {
			return arrayOfBeacons;
		},
		on: eventHandler.on.bind(eventHandler)
	};
})

.factory('BeaconMap', function () {
	return {
      "01:17:C5:59:31:93": "Keuken", //"Keuken",
      "01:17:C5:5E:F9:7E": "Klimaatkast", //"Bestekbakken",
      "01:17:C5:5C:73:A3": "Voercomputer", //"Hal TV",
      "01:17:C5:5C:DD:92": "Frequentieregelaar", //"Kamer 1 voor",
      "01:17:C5:50:43:EC": "Voeren", //"Lessenaar",
      "01:17:C5:58:0B:C4": "Zieke dieren met de hand voeren", //"Tafel midden",
      "01:17:C5:5E:37:0B": "Boekhouding", //"Tafel achter",
      "01:17:C5:56:73:3A": "Temperatuurregeling", //"Kamer 1 achter",
      "01:17:C5:53:10:FA": "Luchtwasser" //"Kamer 1 midden"
    };
});
