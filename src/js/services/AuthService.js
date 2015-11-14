angular.module('DRRrrRrvrr')
.service('AuthService', ['CLIENT_ID', 'SCOPES', function(clientId, scopes) {
  var svc = this;

  this.loadApi = function() {
    gapi.client.load('drive', 'v2');
  };

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
    if(authResult && !authResult.error) {
      svc.isAuthorized = true;
      svc.loadApi();
    } else {
      svc.isAuthorized = false;
    }
  };
}]);