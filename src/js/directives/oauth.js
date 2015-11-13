angular.module('DRRrrRrvrr')
.directive('oauth', ['$interval', 'GoogleDriveService', function($interval, googleDriveService) {
  var link = function(scope, element, attrs) {
    var checkAuth = function() {
      gapi.auth.authorize({
        'client_id': googleDriveService.CLIENT_ID,
        'scope': googleDriveService.SCOPES.join(' '),
        'immediate': true
      }, handleAuthResult);
    };

    var handleAuthResult = function(authResult) {
      if(authResult && !authResult.error) {
        element.hide();
        googleDriveService.isAuthorized = true; 
      } else {
        element.show();
        googleDriveService.isAuthorized = false;
      }
    };

    var handleAuthClick = function(event) {
      gapi.auth.authorize({
        client_id: googleDriveService.CLIENT_ID, 
        scope: googleDriveService.SCOPES, 
        immediate: false
      }, handleAuthResult);
      return false;
    };


    element.on('click', handleAuthClick);

    $interval(checkAuth, 2000);        
    checkAuth();
  };

  return {
    link: link,
    templateUrl: 'templates/oauth.html'
  };
}]);