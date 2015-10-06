(function() {

  angular.module('angularRestHelper', []);

  angular
    .module('angularRestHelper')
    .factory('APIService', ['$q', '$http', APIService]);
    /***
     * @name APIService
     * @param {object} endpoint Endpoint object for APIService that contains path and type properties
     * @description APIService takes in a formatted object or set of arguments that allow the ability to use rest-style endpoints and fill them with a matching params object.
     */

  String.prototype.formatExpress = function() {
    //Formatter to format with /:param notation for express-like languages
    var formatted = this;
    for (var i in arguments[0]) {
      var regexp = new RegExp('\\:' + i + '(?=\/|$)', 'gi');
      formatted = formatted.replace(regexp, arguments[0][i]);
    }
    return formatted;
  };

  String.prototype.formatHapi = function() {
    //Formatter to format with {param} notation for .net and hapi-like languages
    var formatted = this;
    for (var i in arguments[0]) {
      var regexp = new RegExp('\\{' + i + '(}|$)', 'gi');
      formatted = formatted.replace(regexp, arguments[0][i]);
    }
    return formatted;
  };



  function APIService($q, $http) {
    var ApiUrl = this.ApiUrl || ''; //Set ApiUrl with APIServiceProvider.ApiUrl = '...'
    var formatter = this.formatter || 'express'; //Set Formatter with APIServiceProvider.formatter = 'hapi'
    var useHapi = formatter === 'hapi' ? true : false;
    var paramRegex = new RegExp(/:|{/);

    function APICaller() {
      //Returns function to be used as-service, API(endpoint).then(func...

      var params;
      var body;
      var endpoint;
      var headers;
      var formattedUrl;

      if (arguments.length === 0) {

        //We don't want an empty call
        return $q(function() {
          return {
            error: 'MissingData'
          };
        });

      } else if (typeof arguments[0] !== 'object') {

        //TODO: check for string, assume get if first entry has no type
        return $q(function() {
          return {
            error: 'InvalidData'
          };
        });

      } else if (arguments.length === 1) {
        //If one argument, and is an object, we are assuming object is being passed all of the necessary properties
        endpoint = arguments[0].endpoint || arguments[0];
        body = arguments[0].body || void 0;
        params = arguments[0].params || void 0;
        headers = arguments[0].headers || void 0;
      } else if (arguments[0].type === 'get' || arguments[0].type === 'head') {
        //Next we can quickly check for simple calls
        endpoint = arguments[0];
        params = arguments[1] || void 0;
        headers = arguments[2] || void 0;
      } else if (arguments.length === 2) {
        endpoint = arguments[0];
        if (paramRegex.test(endpoint.path)) {
          //When there are parameter flags in the path, we can assume a single accompanying object is the parameter, since the call will fail otherwise
          params = arguments[1] || void 0;
        } else {
          body = arguments[1] || void 0;
        }
      } else if (arguments.length === 3) {
        endpoint = arguments[0];
        if (paramRegex.test(endpoint.path)) {
          body = arguments[1] || void 0;
          params = arguments[2] || void 0;
        } else {
          body = arguments[1] || void 0;
          headers = arguments[2] || void 0;
        }
      } else {
        endpoint = arguments[0];
        body = arguments[1] || void 0;
        params = arguments[2] || void 0;
        headers = arguments[3] || void 0;
      }
      if (!endpoint.type) {
        endpoint.type = 'get';
      }
      if (params) {
        if (useHapi) {
          formattedUrl = endpoint.path.formatHapi(params);
        } else {
          formattedUrl = endpoint.path.formatExpress(params);
        }
      } else {
        formattedUrl = endpoint.path;
      }

      var deferred = $q.defer();

      if (paramRegex.test(formattedUrl)) {
        //If there are still unfulfilled parameters, we return an error
        deferred.reject({
          error: 'MissingParams'
        });
      } else {
        var request = {
          method: endpoint.type,
          //TODO: this.ApiUrl for multiple API.music('') endpoint options
          url: ApiUrl + formattedUrl
        };

        if (body) {
          request.data = body;
        }

        if (headers) {
          request.headers = headers;
        }


        $http(request).success(deferred.resolve).error(deferred.reject);
      }

      return deferred.promise;
    }


    apiInstance = APICaller;
    //TODO: allow setting multiple apiUrl on the Provider, with each of these becoming a function that can be called to run against that apiurl.
    apiInstance.prototype.ApiUrl = ApiUrl;

    return apiInstance;

  }

})();
