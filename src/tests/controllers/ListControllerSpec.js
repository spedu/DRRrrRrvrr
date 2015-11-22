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

  it('should load files once user is authorized', function() {
    spyOn(driveService, 'loadFiles');
    authService.isAuthorized = true;
    $scope.$digest();
    expect(driveService.loadFiles).toHaveBeenCalled();
  });

  it('should not call load files if is authorized is false', function() {
    spyOn(driveService, 'loadFiles');
    authService.isAuthorized = false;
    expect(authService.isAuthorized).toBeFalsy();
    $scope.$digest();
    expect(driveService.loadFiles).not.toHaveBeenCalled();
  });
});