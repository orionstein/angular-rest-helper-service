describe('express-format', function() {
  beforeEach(module('testModuleExpress'));
  describe('apiGet()', function() {
    it('should make a simple get call with API endpoint', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {
      $httpBackend
        .when('GET', 'https://api.apiendpoint.com/test')
        .respond({
          item: 'test'
        });
      var endpoint = {
        path: '/test',
        type: 'get'
      };
      var testController = $controller('testController');
      testController.apiService(endpoint).then(function(res) {
        res.item.should.equal('test');
      }, function(err) {
        err.should.not.be.ok();
      });
      $httpBackend.flush();
    }]));
  });

  describe('apiGetParams()', function() {
    it('should make a call to the correct path with split params', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {
      $httpBackend
        .when('GET', 'https://api.apiendpoint.com/test/12345')
        .respond({
          item: 'test'
        });

      var testController = $controller('testController');

      var endpoint = {
        path: '/test/:id',
        type: 'get'
      };

      var params = {
        id: '12345'
      };

      testController.apiService(endpoint, params).then(function(res) {
        res.item.should.equal('test');
      }, function(err) {
        err.should.not.be.ok();
      });
      $httpBackend.flush();
    }]));

    it('should make a call to the correct path with single req object', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {
      $httpBackend
        .when('GET', 'https://api.apiendpoint.com/test/12345')
        .respond({
          item: 'test'
        });

      var testController = $controller('testController');

      var endpoint = {
        path: '/test/:id',
        type: 'get'
      };
      var params = {
        id: '12345'
      };

      var req = {
        endpoint: endpoint,
        params: params
      };

      testController.apiService(req).then(function(res) {
        res.item.should.equal('test');
      }, function(err) {
        err.should.not.be.ok();
      });
      $httpBackend.flush();
    }]));
  });
});
