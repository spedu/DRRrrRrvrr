describe('TranslatorService', function() {
  var translator,
      $httpBackend;

  var zombifyMock = { message: 'BRAINS' };    

  beforeEach(function() {
    module('DRRrrRrvrr');

    inject(function($injector){
      translator = $injector.get('TranslatorService');
      $httpBackend = $injector.get('$httpBackend');
    });

    $httpBackend
      .when('GET', 'http://ancient-anchorage-9224.herokuapp.com/zombify')
      .respond(200, zombifyMock);
  });

  describe('#translate', function() {
    it('should translate the text to zombie', function() {
      var text = 'SOMETHING';
      translator.translate(text, function(translatedText) {
        expect(translatedText).toBe(zombifyMock.message);
      });
    });
  });
});