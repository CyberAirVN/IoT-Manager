(function () {
  'use strict';

  angular
    .module('devices.admin')
    .controller('DevicesAdminController', DevicesAdminController);

  DevicesAdminController.$inject = ['$scope', '$state', '$window', 'deviceResolve', 'Authentication', 'Notification'];

  function DevicesAdminController($scope, $state, $window, device, Authentication, Notification) {
    var vm = this;

    vm.device = device;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.device.$remove(function() {
          $state.go('admin.devices.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new device, or update the current instance
      vm.device.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.devices.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }
  }
}());
