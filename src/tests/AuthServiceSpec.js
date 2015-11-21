describe('AuthService', function() {
  var CLIENT_ID = 'TEST_CLIENT_ID',
      SCOPES = ['api.scope.1'];

  var window,
      authService;    

  beforeEach(function() {
    module('DRRrrRrvrr');

    module(function($provide) {
      $provide.value('CLIENT_ID', CLIENT_ID);
      $provide.value('SCOPES', SCOPES);
    });

    inject(function($injector) {
      window = $injector.get('$window');
      window.gapi = {
        auth: {
          authorize: function(options, callback) {
            if(callback) {
              callback();
            }
          }
        }
      };

      authService = $injector.get('AuthService');
    });
  });

  describe('#authorize', function() {
    it("should call google's auth api", function() {
      spyOn(window.gapi.auth, 'authorize');
      authService.authorize(true);
      expect(window.gapi.auth.authorize).toHaveBeenCalledWith({
        client_id: CLIENT_ID,
        scope: 'api.scope.1',
        immediate: true
      }, authService.handleAuthResult);
    });

    it('should call handleAuthResult', function() {
      spyOn(window.gapi.auth, 'authorize').and.callThrough();
      spyOn(authService, 'handleAuthResult');
      authService.authorize(true);
      expect(authService.handleAuthResult).toHaveBeenCalled();
    });
  });

  describe('#handleAuthResult', function() {
    describe('given there are no results', function() {
      it('should set isAuthorized to false', function() {
        authService.isAuthorized = true;
        expect(authService.isAuthorized).toBeTruthy();
        authService.handleAuthResult();
        expect(authService.isAuthorized).toBeFalsy();
      });
    });

    describe('given the auth results contains an error', function() {
      it('should set isAuthorized to false', function() {
        authService.isAuthorized = true;
        expect(authService.isAuthorized).toBeTruthy();
        authService.handleAuthResult({error: 'something'});
        expect(authService.isAuthorized).toBeFalsy();
      });
    });

    describe('given the auth results does not contain an error', function() {
      it('should set isAuthorized to false', function() {
        authService.isAuthorized = false;
        expect(authService.isAuthorized).toBeFalsy();
        authService.handleAuthResult({success: '!'});
        expect(authService.isAuthorized).toBeTruthy();
      });
    });
  });
});