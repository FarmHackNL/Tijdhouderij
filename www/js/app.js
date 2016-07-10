angular.module('Tijdhouderij', ['ionic', 'Tijdhouderij.Controllers', 'ionic-datepicker'])

.run(function($ionicPlatform, Eddystone) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    Eddystone.start();

    $ionicPlatform.on('pause', function () {
      Eddystone.stop();
    });

    $ionicPlatform.on('resume', function () {
      Eddystone.start();
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {
  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.over', {
    url: '/over',
    views: {
      'tab-over': {
        templateUrl: 'templates/tab-over.html'
      }
    }
  })
  .state('tab.activiteiten', {
    url: '/activiteiten',
    views: {
      'tab-activiteiten': {
        templateUrl: 'templates/tab-activiteiten.html',
        controller: 'ActiviteitenCtrl'
      }
    }
  })
  .state('tab.live', {
    url: '/live',
    views: {
      'tab-live': {
        templateUrl: 'templates/tab-live.html',
        controller: 'LiveCtrl'
      }
    }
  })
  .state('tab.historie', {
    url: '/historie',
    views: {
      'tab-historie': {
        templateUrl: 'templates/tab-historie.html',
        controller: 'HistorieCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/live');

  var datePickerObj = {
    inputDate: new Date(),
    setLabel: 'Kiezen',
    todayLabel: 'Vdg.',
    closeLabel: 'Sluiten',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "Maart", "April", "Mei", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
});
