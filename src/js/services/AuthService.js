angular.module('DRRrrRrvrr')
.service('AuthService', ['$rootScope', 'CLIENT_ID', 'SCOPES', function($rootScope, clientId, scopes) {
  var svc = this;

  this.authorize = function(immediate) {
    if(immediate === undefined) {
      immediate = true;
    }
    
    if(gapi.auth && gapi.auth.authorize) {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes.join(' '),
        immediate: immediate
      }, this.handleAuthResult);
    }
  };

  this.handleAuthResult = function(authResult) {
    console.log('handleAuthResult');
    if(authResult && !authResult.error) {
      console.log('Authorized');
      svc.isAuthorized = true;
    } else {
      console.log('Unauthorized');
      svc.isAuthorized = false;
    }
    $rootScope.$apply();
  };
}]);