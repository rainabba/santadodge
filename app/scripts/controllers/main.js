'use strict';

/**
 * @ngdoc function
 * @name santadodgeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the santadodgeApp
 */
angular.module('santadodge')
  .controller('MainCtrl', function ($scope) {
  	var socket = null;
    if(typeof io !== undefined) {
    	socket = io();
    	socket.on('connect', function(e) {
    		console.log('conected');
    	});
    }
  });
