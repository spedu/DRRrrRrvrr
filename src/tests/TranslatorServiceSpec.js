describe('TranslatorService', function() {
  var translator,
      $httpBackend;

  beforeEach(function() {
    module('DRRrrRrvrr');

    inject(function($injector){
      translator = $injector.get('posts');
      $httpBackend = $injector.get('$httpBackend');
    });

    $httpBackend
      .when('GET', 'http://ancient-anchorage-9224.herokuapp.com/zombify?q=')
      .respond(200, 'BRAINS');
      
  });
});