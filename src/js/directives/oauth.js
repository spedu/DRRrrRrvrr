angular.module('DRRrrRrvrr')
.directive('oauth', ['$rootScope', '$interval', 'AuthService', function($rootScope, $interval, authService) {

  var checkAuth = function() {
    authService.authorize(true);
  };

  $interval(checkAuth, 5000);
  checkAuth(true);

  var controller = function() {
    this.authService = authService;

    this.authorize = function() {
      authService.authorize(false);
    };
  };

  return {
    restrict: 'E',
    controller: controller,
    controllerAs: 'ac',
    templateUrl: 'templates/oauth.html'
  };
}]);