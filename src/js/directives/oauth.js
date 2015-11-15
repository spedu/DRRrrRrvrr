angular.module('DRRrrRrvrr')
.directive('oauth', ['$rootScope', '$interval', 'AuthService', function($rootScope, $interval, authService) {
  $interval(authService.authorize, 5000);
  authService.authorize(true);

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