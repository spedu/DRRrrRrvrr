angular.module('DRRrrRrvrr')
.directive('oauth', ['$rootScope', '$interval', 'AuthService', function($rootScope, $interval, authService) {
  var check;

  var checkAuth = function() {
    authService.authorize(true);
  };

  check = $interval(checkAuth, 2000);
  checkAuth();

  var controller = function() {
    this.authService = authService;

    this.authorize = function() {
      authService.authorize(false);
    };
  };

  return {
    controller: controller,
    controllerAs: 'ac',
    templateUrl: 'templates/oauth.html'
  };
}]);