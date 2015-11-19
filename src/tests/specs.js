describe('something', function() {
  beforeEach(function() {
    module('DRRrrRrvrr');

    inject(function($injector) {
      window = $injector.get('$window');
      window.gapi = {
        auth: {
          authorize: function(options, callback) {
            // mocked function
          }
        },
        client: {
          drive: {
            files: {
              list: function(options) {
                return {
                  execute: function(callback) {
                    callback('stubbed data');
                  }
                };
              }
            }
          }
        }
      };
    });
  });

  it("should be true", function(){
    console.log(gapi);
    expect(true).toBeTruthy();
  });
});
