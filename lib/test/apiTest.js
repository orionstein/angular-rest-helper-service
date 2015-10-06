describe('APIService', function() {

  describe('basicGet()', function() {
  beforeEach(module('angularRestHelper'));
    it('should make a simple get call', inject(['APIService', '$httpBackend', function(APIService, $httpBackend) {
      $httpBackend
        .when('GET', '/test')
        .respond({
          item: 'test'
        });
      var endpoint = {
        path: '/test',
        type: 'get'
      };
      APIService(endpoint).then(function(res) {
        res.item.should.equal('test');
      }, function(err) {
        err.should.not.be.ok();
      });
      $httpBackend.flush();
    }]));
  });

});
