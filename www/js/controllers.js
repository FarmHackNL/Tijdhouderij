angular.module('Tijdhouderij.Controllers', ['Tijdhouderij.Services'])

.controller('ActiviteitenCtrl', function ($scope, $ionicActionSheet, $ionicModal, Eddystone, BeaconMap) {
	$scope.beaconMap = BeaconMap;

	$ionicModal.fromTemplateUrl('templates/modal-koppeling.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.mappingClicked = function (beaconAddress) {
		$ionicActionSheet.show({
			buttons: [
				{ text: 'Aanpassen' }
			],
			destructiveText: 'Verwijderen',
			titleText: 'Koppeling aanpassen',
			cancelText: 'Annuleren',
			buttonClicked: function(index) {
				if (index === 0) {
					$scope.modifyBeaconAddress = beaconAddress;
					$scope.modifyActivityName = $scope.beaconMap[beaconAddress];
					$scope.modal.show();
				}
				return true;
			}
		});
	};

	$scope.newActivityClicked = function () {
		$scope.modal.show();
	};

	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});
})

.controller('LiveCtrl', function ($scope, Eddystone, BeaconMap) {
	window.Eddystone = Eddystone;
	$scope.beaconMap = BeaconMap;
	$scope.beacons = Eddystone.getAll();
    Eddystone.on('listUpdated', function (beacons) {
		$scope.$apply(function () {
			$scope.beaconMap = BeaconMap;
			$scope.beacons = beacons;
		});
    });

    $scope.refresh = function () {
    	$scope.beacons = [];
    	Eddystone.stop();
    	setTimeout(function () {
    		Eddystone.start();
    	}, 1000);
    };
})

.controller('HistorieCtrl', function ($scope, ionicDatePicker) {
	$scope.datePickerObject = {
		inputDate: new Date(),
		callback: function (date) {
			$scope.datePickerObject.inputDate = date;
			$scope.mockItems = [
				'9:04 - 9:57: Keuken',
				'9:58 - 11:33: Boekhouding',
				'11:33 - 13:44: Luchtwasser',
				'13:45 - 14:57: Voeren',
				'14:58 - 16:15: Keuken',
				'16:16 - 16:23: Boekhouding',
				'16:24 - 16:30: Klimaatkast',
				'16:31 - 16:44: Zieke dieren met de hand voeren'
			];
		}
	};
	$scope.datePickerClicked = function () {
		ionicDatePicker.openDatePicker($scope.datePickerObject);
	};
	$scope.mockItems = [
		'9:04 - 9:57: Zieke dieren met de hand voeren',
		'9:58 - 11:33: Voeren',
		'11:33 - 13:44: Keuken',
		'13:45 - 14:57: Boekhouding',
		'14:58 - 15:30: Keuken',
		'15:31 - 16:01: Boekhouding',
		'16:02 - 16:23: Luchtwasser',
		'16:24 - 16:30: Klimaatkast'
	];
});
