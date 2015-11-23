angular.module('DRRrrRrvrr')
.controller('DocumentController',
  ['$scope', '$routeParams', 'AuthService', 'GoogleDriveService', 'TranslatorService',
  function($scope, $routeParams, authService, googleDriveService, translatorService) {
    var vm = this;

    this.fileId = $routeParams.fileId;

    this.body = '';
    this.googleDriveService = googleDriveService;

    $scope.$watch(function() {
      return authService.isAuthorized;
    }, function() {
      vm.loadFile();
    });

    $scope.$watch(function() {
      return googleDriveService.current;
    }, function(body) {
      vm.zombifyBody(body);
    });

    this.loadFile = function() {
      if(authService.isAuthorized) {
        googleDriveService.loadFile(vm.fileId);
      }
    };

    this.zombifyBody = function(body) {
      translatorService.translate(body, function(translatedBody) {
        vm.body = translatedBody;
      });
    };

    vm.loadFile();
}]);