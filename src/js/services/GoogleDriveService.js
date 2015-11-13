angular.module('DRRrrRrvrr')
.service('GoogleDriveService', ['CLIENT_ID', 'SCOPES', function(CLIENT_ID, SCOPES) {
  this.CLIENT_ID = CLIENT_ID;
  this.SCOPES = SCOPES;

  this.isAuthorized = false;

  this.listFiles = function() {

  };

  this.displayFile = function() {

  };
}]);