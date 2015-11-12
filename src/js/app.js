var app = angular.module('DRRrrRrvrr', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/list.html',
      controller: 'ListController',
      controllerAs: 'vm'
    })
    .when('/document', {
      templateUrl: 'templates/document.html',
      controller: 'DocumentController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/list'
    });
}]);