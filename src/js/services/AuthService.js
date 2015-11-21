angular.module('DRRrrRrvrr')
.service('AuthService', ['$rootScope', 'CLIENT_ID', 'SCOPES', function($rootScope, clientId, scopes) {
  var svc = this;

  svc.isAuthorized = false;

  this.authorize = function(immediate) {    
    if(gapi.auth && gapi.auth.authorize) {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes.join(' '),
        immediate: immediate
      }, this.handleAuthResult);
    }
  };

  this.handleAuthResult = function(authResult) {
    if(authResult && !authResult.error) {
      svc.isAuthorized = true;
    } else {
      svc.isAuthorized = false;
    }
    $rootScope.$apply();
  };
}]);