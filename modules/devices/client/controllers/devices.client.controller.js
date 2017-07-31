(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesController', DevicesController);

  DevicesController.$inject = ['$scope', 'deviceResolve', 'Authentication'];

  function DevicesController($scope, device, Authentication) {
    var vm = this;

    vm.device = device;
    vm.authentication = Authentication;

  }
}());
