angular.module('DRRrrRrvrr')
.service('GoogleDriveService', ['$http', function($http) {
  var svc = this;

  this.files = [];
  this.current = null;

  this.loadFiles = function() {
    var request = gapi.client.drive.files.list({
      'maxResults': 10,
      'q': "mimeType = 'application/vnd.google-apps.document'"
    });

    request.execute(function(resp) {
      var files = resp.items;
      if(files && files.length > 0) {
        for(var i = 0; i < files.length; i++) {
          svc.files.append(files[i]);
        }
      }
    });
  };

  this.displayFile = function(fileId, callback) {
    var request = gapi.client.drive.files.get({fileId: fileId});

    request.execute(function(resp) {
      var accessToken = gapi.auth.getToken().access_token;

      $http.get(resp.exportLinks["text/plain"], {
        headers: {
          'Authorization': 'Bearer '+accessToken
        }
      }).then(function(data) {
        svc.current = data.replace(/\n/g, "<br>");
        if(callback){
          callback();
        }
      });
    });
  };
}]);