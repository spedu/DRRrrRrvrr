angular.module('DRRrrRrvrr')
.controller('AuthController', ['GoogleDriveService', function(googleDriveService) {
  var vm = this;

  vm.isAuthorized = false;

  vm.checkAuth = function() {
    gapi.auth.authorize({
      'client_id': googleDriveService.CLIENT_ID,
      'scope': googleDriveService.SCOPES.join(' '),
      'immediate': true
    }, vm.handleAuthResult);
  };

  vm.handleAuthResult = function(authResult) {
    if(authResult && !authResult.error) {
      vm.isAuthorized = true; 
      //loadDriveApi();
    } else {
      vm.isAuthorized = false;
    }
  };

  vm.handleAuthClick = function(event) {
    gapi.auth.authorize({
      client_id: googleDriveService.CLIENT_ID, 
      scope: googleDriveService.SCOPES, 
      immediate: false
    }, vm.handleAuthResult);
    return false;
  };
}]);