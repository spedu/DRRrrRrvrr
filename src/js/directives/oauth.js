angular.module('DRRrrRrvrr')
.directive('oauth', ['$interval', 'AuthService', function($interval, authService) {
  var check;

  var checkAuth = function() {
    authService.authorize(true);
  };

  var link = function() {
    check = $interval(checkAuth, 2000);
    checkAuth();
  };

  var controller = function() {
    this.authService = authService;

    this.handleAuthClick = function() {
      authService.authorize(false);
    };
  };

  return {
    link: link,
    controller: controller,
    controllerAs: 'ac',
    templateUrl: 'templates/oauth.html'
  };
}]);