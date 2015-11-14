angular.module('DRRrrRrvrr')
.controller('ListController', ['$scope', 'AuthService', 'GoogleDriveService', function($scope, authService, googleDriveService) {
  var vm = this;

  vm.googleDriveService = googleDriveService;

  $scope.$watch(function() {
    return authService.isAuthorized;
  }, function(isAuthorized) {
    if(isAuthorized) {
      console.log('isAuthorized ListController');
      googleDriveService.loadFiles();
    }
  });
}]);