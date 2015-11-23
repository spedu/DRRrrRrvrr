describe('DocumentController', function() {
  var $scope,
      documentController,
      authService,
      driveService,
      translatorService;

  var fileId = 1;    
  
  beforeEach(function() {
    module('DRRrrRrvrr');

    module(function($provide) {
      $provide.service('TranslatorService', function() {
        this.translate = function(body, callback) {
          callback(body + '!');
        };
      });
    });

    inject(function($rootScope, $controller, $injector) {
      $scope = $rootScope.$new();
      documentController = $controller('DocumentController', {
        $scope: $scope,
        $routeParams: { fileId: fileId }
      });

      authService = $injector.get('AuthService');
      driveService = $injector.get('GoogleDriveService');
      translatorService = $injector.get('TranslatorService');
    });
  });

  it('should initialize body to be an empty string', function() {
    expect(documentController.body).toBe('');
  });

  it('should set the file id to the route parameter', function() {
    expect(documentController.fileId).toBe(fileId);
  });

  describe('#loadFile', function() {
    beforeEach(function() {
      spyOn(driveService, 'loadFile');
    });

    it('should load file once user is authorized', function() {
      authService.isAuthorized = true;
      expect(authService.isAuthorized).toBeTruthy();
      documentController.loadFile();
      expect(driveService.loadFile).toHaveBeenCalledWith(fileId);
    });

    it('should not call load file if is authorized is false', function() {
      authService.isAuthorized = false;
      expect(authService.isAuthorized).toBeFalsy();
      documentController.loadFile();
      expect(driveService.loadFile).not.toHaveBeenCalled();
    });
  });

  describe('#zombifyBody', function() {
    it('should call TranslatorService#translate', function() {
      spyOn(translatorService, 'translate').and.callThrough();
      documentController.zombifyBody('Hello');
      expect(translatorService.translate).toHaveBeenCalled();
      expect(documentController.body).toBe('Hello!');
    });
  });

  describe('when user authorization changes', function() {
    it('should call load files', function() {
      spyOn(documentController, 'loadFile');
      authService.isAuthorized = true;
      expect(authService.isAuthorized).toBeTruthy();
      $scope.$digest();
      expect(documentController.loadFile).toHaveBeenCalled();
    });
  });

  describe('when the current file body is set', function() {
    it('should call zombifyBody', function() {
      spyOn(documentController, 'zombifyBody');
      driveService.current = 'Something';
      $scope.$digest();
      expect(documentController.zombifyBody).toHaveBeenCalledWith('Something');
    });
  });
});