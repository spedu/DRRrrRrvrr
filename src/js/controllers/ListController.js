angular.module('DRRrrRrvrr')
.controller('ListController', ['GoogleDriveService', function(googleDriveService) {
  var vm = this;

  vm.googleDriveService = googleDriveService;
}]);