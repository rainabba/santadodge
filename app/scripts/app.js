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
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game', {
        templateUrl: 'app/views/game.html',
        controller: 'GameCtrl'
      })
      .when('/dodger', {
        templateUrl: 'app/views/dodger.html',
        controller: 'DodgerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
