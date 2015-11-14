angular.module('DRRrrRrvrr')
.service('TranslatorService', ['$http', function($http) {
  
  this.translate = function(text, callback) {
    if(text !== undefined) {
      var translatedText = '';
      $http.get('http://ancient-anchorage-9224.herokuapp.com/zombify?q=' + text)
          .then(function(response){
            translatedText = response.data.message;
            if(callback) {
              callback(translatedText);
            }
          });
    }
  };
}]);