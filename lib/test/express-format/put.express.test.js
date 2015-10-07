describe('express-format', function() {
  beforeEach(module('testModuleExpress'));
  describe('apiPut()', function() {
    it('should make a simple put call with API endpoint', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {

      $httpBackend
        .when('PUT', 'https://api.apiendpoint.com/test')
        .respond({
          item: 'test'
        });

      var endpoint = {
        path: '/test',
        type: 'put'
      };

      var body = {
        name: 'bob'
      };

      var testController = $controller('testController');

      testController.apiService(endpoint, body).then(function(res) {
        res.item.should.equal('test');
      }, function(err) {
        err.should.not.be.ok();
      });

      $httpBackend.flush();

    }]));
    it('should fail when params are needed', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {

      var endpoint = {
        path: '/test/:id',
        type: 'put'
      };

      var body = {
        name: 'bob'
      };

      var testController = $controller('testController');

      testController.apiService(endpoint, body).then(function(res) {}, function(err) {
        err.error.should.equal('MissingParams');
      });

    }]));
  });

  describe('apiGetParams()', function() {
    it('should make a put to the correct path with split params', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {
      $httpBackend
        .when('PUT', 'https://api.apiendpoint.com/test/12345')
        .respond({
          item: 'test'
        });

      var testController = $controller('testController');

      var endpoint = {
        path: '/test/:id',
        type: 'put'
      };

      var body = {
        name: 'bob'
      };

      var params = {
        id: '12345'
      };

      testController.apiService(endpoint, body, params).then(function(res) {
        res.item.should.equal('test');
      }, function(err) {
        err.should.not.be.ok();
      });
      $httpBackend.flush();
    }]));

    it('should make a put to the correct path with single req object', inject(['$controller', '$httpBackend', function($controller, $httpBackend) {
      $httpBackend
        .when('PUT', 'https://api.apiendpoint.com/test/12345')
        .respond({
          item: 'test'
        });

      var testController = $controller('testController');

      var endpoint = {
        path: '/test/:id',
        type: 'put'
      };

      var body = {
        name: 'bob'
      };

      var params = {
        id: '12345'
      };

      var req = {
        endpoint: endpoint,
        body: body,
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

