(function() {

  angular.module('angularRestHelper', []);

  angular
    .module('angularRestHelper')
    .factory('APIService', ['$q', '$http', APIService]);

  String.prototype.formatExpress = function() {
    var formatted = this;
    for (var i in arguments[0]) {
      var regexp = new RegExp('\\:' + i + '(?=\/|$)', 'gi');
      formatted = formatted.replace(regexp, arguments[0][i]);
    }
    return formatted;
  };

  String.prototype.formatHapi = function() {
    var formatted = this;
    for (var i in arguments[0]) {
      var regexp = new RegExp('\\{' + i + '(}|$)', 'gi');
      formatted = formatted.replace(regexp, arguments[0][i]);
    }
    return formatted;
  };

  function APIService($q, $http) {

    var ApiUrl = this.ApiUrl;

    var formatter = this.formatter || 'express';

    var useHapi = formatter === 'hapi' ? true : false;

    return function() {
      var params;
      var body;
      var endpoint;
      var formattedUrl;

      if (arguments.length === 0) {
        return $q(function() {
          return {
            error: 'MissingData'
          };
        });
      } 
      else if (typeof arguments[0] !== 'object') {
        return $q(function() {
          return {
            error: 'InvalidData'
          };
        });
      } 
      else if (arguments.length === 1) {
        endpoint = arguments[0].endpoint || arguments[0];
        body = arguments[0].body || void 0;
        params = arguments[0].params || void 0;
      } 
      else {
        endpoint = arguments[0];
        if (endpoint.type !== 'get' && endpoint.type !== 'head') {
          body = arguments[1] || void 0;
          params = arguments[2] || void 0;
        }
        else {
          params = arguments[1] || void 0;
        }
      }
      if (params) {
        if (useHapi)
        {
          formattedUrl = ApiUrl + endpoint.path.formatHapi(params);
        }
        else
        {
          formattedUrl = ApiUrl + endpoint.path.formatExpress(params);
        }
      }
      else {
        formattedUrl = ApiUrl + endpoint.path;
      }

      var request = {
        method: endpoint.type,
        url: formattedUrl
      };

      if (endpoint.type !== 'get' && endpoint.type !== 'head') {
        request.data = body;
      }

      var deferred = $q.defer();

      $http(request).success(deferred.resolve).error(deferred.reject);

      return deferred.promise;
    };

  } // End of APIService()

})();
