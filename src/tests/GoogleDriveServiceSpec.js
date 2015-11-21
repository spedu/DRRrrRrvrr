describe('GoogleDriveService', function() {
  var window,
      driveService,
      $httpBackend;

  var filesMock = [
    {
      id: 1,
      title: 'File 1'
    },
    {
      id: 2,
      title: 'File 2'
    },
    {
      id: 3,
      title: 'File 3'
    }
  ];

  var accessToken = 'FAKE_ACCESS_TOKEN';
  var documentURL = 'http://localhost/fake/route';

  beforeEach(function() {
    module('DRRrrRrvrr');

    inject(function($injector) {
      window = $injector.get('$window');
      window.gapi = {
        auth: {
          getToken: function() {
            return {
              access_token: accessToken
            };
          }
        },
        client: {
          drive: {
            files: {
              list: function() {
                return {
                  execute: function(callback) {
                    callback({ items: filesMock });
                  }
                };
              },

              get: function() {
                return {
                  execute: function(callback) {
                    callback({
                      exportLinks: {
                        'text/plain': documentURL
                      }
                    });
                  }
                };
              }
            }
          }
        }
      };

      driveService = $injector.get('GoogleDriveService');
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  describe('#loadFiles', function() {
    it('should request files from google drive', function() {
      expect(driveService.files).toEqual([]);
      driveService.loadFiles();
      expect(driveService.files).toEqual(filesMock);
    });
  });

  describe('#loadFile', function() {
    it('should request file from google drive', function() {
      var fileId = '12345';
      var documentResponse = 'Document Text';
      $httpBackend.when('GET', documentURL)
        .respond(200, documentResponse);

      spyOn(gapi.client.drive.files, 'get').and.callThrough();
      spyOn(gapi.auth, 'getToken').and.callThrough();

      expect(driveService.current).toBeUndefined();

      driveService.loadFile(fileId, function() {
        expect(gapi.client.drive.files.get).toHaveBeenCalledWith({fileId: fileId});
        expect(gapi.auth.getToken).toHaveBeenCalled();

        expect(driveService.current).toBe(documentResponse);
      });

      $httpBackend.flush();
    });
  });
});