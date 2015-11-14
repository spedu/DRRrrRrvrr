angular.module('DRRrrRrvrr')
.controller('DocumentController',
  ['$scope', '$routeParams', 'AuthService', 'GoogleDriveService', 'TranslatorService',
  function($scope, $routeParams, authService, googleDriveService, translatorService) {
    this.fileId = $routeParams.fileId;

    $scope.$watch(function() {
      return authService.isAuthorized;
    }, function(isAuthorized) {
      if(isAuthorized) {
        googleDriveService.loadApi();
      }
    });
  
    // when displaying the text zombify(text).replace(/\n/g, "<br>") ? There might be a angular filter that does this automatically
}]);