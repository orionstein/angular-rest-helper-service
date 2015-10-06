angular.module('testModuleExpress', ['angularRestHelper']);

angular.module('testModuleExpress').config(['APIServiceProvider', function(APIServiceProvider){
  APIServiceProvider.ApiUrl = 'https://api.apiendpoint.com';
}]);

angular.module('testModuleExpress').controller('testController', ['APIService', function(APIService){
  var self = this;
  self.apiService = APIService;
}]);
