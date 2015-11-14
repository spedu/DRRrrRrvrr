angular.module('DRRrrRrvrr')
.service('GoogleDriveService', ['$rootScope', '$http', function($rootScope, $http) {
  var svc = this;

  this.files = [];
  this.current;

  this.loadFiles = function(callback) {
    svc.files = [];

    var request = gapi.client.drive.files.list({
      'maxResults': 10,
      'q': "mimeType = 'application/vnd.google-apps.document'"
    });

    request.execute(function(resp) {
      var files = resp.items;
      if(files && files.length > 0) {
        for(var i = 0; i < files.length; i++) {
          svc.files.push(files[i]);
        }
      }

      $rootScope.$apply();

      if(callback) {
        callback();
      }
    });
  };

  this.loadFile = function(fileId, callback) {
    var request = gapi.client.drive.files.get({fileId: fileId});

    request.execute(function(resp) {
      var accessToken = gapi.auth.getToken().access_token;

      $http.get(resp.exportLinks["text/plain"], {
        headers: {
          'Authorization': 'Bearer '+accessToken
        }
      }).then(function(data) {
        svc.current = data.data;
        if(callback){
          callback();
        }
      });
    });
  };
}]);