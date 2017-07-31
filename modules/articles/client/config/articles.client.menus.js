(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidebar', {
      title: 'Devices',
      state: 'devices',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('sidebar', 'devices', {
      title: 'List Devices',
      state: 'devices.list',
      roles: ['*']
    });
  }
}());
