'use strict';

/**
 * @ngdoc overview
 * @name santadodgeApp
 * @description
 * # santadodgeApp
 *
 * Main module of the application.
 */
angular
  .module('santadodge', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/shooter', {
        templateUrl: 'views/shooter.html',
        controller: 'ShooterCtrl'
      })
      .when('/dodger', {
        templateUrl: 'views/dodger.html',
        controller: 'DodgerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
