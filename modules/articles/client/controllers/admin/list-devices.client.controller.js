(function () {
  'use strict';

  angular
    .module('devices.admin')
    .controller('DevicesAdminListController', DevicesAdminListController);

  DevicesAdminListController.$inject = ['DevicesService'];

  function DevicesAdminListController(DevicesService) {
    var vm = this;

    vm.devices = DevicesService.query();
  }
}());
