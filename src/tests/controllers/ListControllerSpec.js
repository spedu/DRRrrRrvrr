describe('ListController', function() {
  var $scope,
      listController,
      authService,
      driveService;

  beforeEach(function(){
    module('DRRrrRrvrr');

    inject(function($rootScope, $controller, $injector) {
      $scope = $rootScope.$new();
      listController = $controller('ListController', {
        $scope: $scope
      });

      authService = $injector.get('AuthService');
      driveService = $injector.get('GoogleDriveService');
    });
  });

  describe('#loadFiles', function() {
    beforeEach(function() {
      spyOn(driveService, 'loadFiles');
    });

    it('should load files once user is authorized', function() {
      authService.isAuthorized = true;
      expect(authService.isAuthorized).toBeTruthy();
      listController.loadFiles();
      expect(driveService.loadFiles).toHaveBeenCalled();
    });

    it('should not call load files if is authorized is false', function() {
      authService.isAuthorized = false;
      expect(authService.isAuthorized).toBeFalsy();
      listController.loadFiles();
      expect(driveService.loadFiles).not.toHaveBeenCalled();
    });
  });

  describe('when user authorization changes', function() {
    it('should call load files', function() {
      spyOn(listController, 'loadFiles');
      authService.isAuthorized = true;
      expect(authService.isAuthorized).toBeTruthy();
      $scope.$digest();
      expect(listController.loadFiles).toHaveBeenCalled();
    });
  });
  
});