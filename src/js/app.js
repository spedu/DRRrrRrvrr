var app = angular.module('DRRrrRrvrr', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'templates/list.html',
      controller: 'ListController',
      controllerAs: 'vm'
    })
    .when('/document/:fileId', {
      templateUrl: 'templates/document.html',
      controller: 'DocumentController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/list'
    });
}]);