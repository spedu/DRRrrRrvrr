angular.module('DRRrrRrvrr')
.service('GoogleDriveService', ['$rootScope', '$http', function($rootScope, $http) {
  var svc = this;

  this.files = [];
  this.current = undefined;

  this.loadFiles = function() {
    svc.files = [];

    var request = gapi.client.drive.files.list({
      'maxResults': 10,
      'q': "mimeType = 'application/vnd.google-apps.document'"
    });

    request.execute(function(resp) {
      var files = resp.items;
      if(files && files.length > 0) {
        svc.files = files;
      }
      $rootScope.$apply();
    });
  };

  this.loadFile = function(fileId, callback) {
    svc.current = undefined;

    var request = gapi.client.drive.files.get({fileId: fileId});

    request.execute(function(resp) {
      var accessToken = gapi.auth.getToken().access_token;

      console.log(resp);
      console.log($http.get);

      $http.get(resp.exportLinks["text/plain"], {
        headers: {
          'Authorization': 'Bearer '+accessToken
        }
      }).then(function(data) {
        console.log('data');
        svc.current = data.data;

        if(callback){
          callback();
        }
      });
    });
  };
}]);