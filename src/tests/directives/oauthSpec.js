describe('oath', function() {
  var compile,
      $scope,
      authService,
      controller,
      compiledDirective;

  beforeEach(function() {
    module('templates', 'DRRrrRrvrr');

    module(function($provide) {
      $provide.service('AuthService', function() {
        var svc = this;

        this.isAuthorized = false;

        this.authorize = function() {
          svc.isAuthorized = !svc.isAuthorized;
        };
      });
    });

    inject(function($compile, $rootScope, $injector){
      compile = $compile;
      $scope = $rootScope.$new();

      authService = $injector.get('AuthService');
    });

    var element = angular.element('<oauth></oauth>');
    compiledDirective = compile(element)($scope);
    $scope.$digest();
    controller = element.controller('oauth');
  });

  describe('controller#authorize', function() {
    it('should call authService authorize', function() {
      spyOn(authService, 'authorize');
      controller.authorize();
      expect(authService.authorize).toHaveBeenCalled();
    });
  });

  describe('when user is not authorized', function() {
    xit('should show the authorize button', function() {
      authService.isAuthorized = false;
      
      expect(compiledDirective.css('display')).not.toBe('hidden');
    });
  });

  describe('when user is authorized', function() {
    xit('should hide the authorize button', function() {
      authService.isAuthorized = true;
      
      expect(compiledDirective.css('display')).toBe('hidden');
    });
  });


});