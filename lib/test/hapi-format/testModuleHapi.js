angular.module('testModuleHapi', ['angularRestHelper']);

angular.module('testModuleHapi').config(['APIServiceProvider', function(APIServiceProvider){
  APIServiceProvider.ApiUrl = 'https://api.apiendpoint.com';
  APIServiceProvider.formatter = 'hapi';
}]);

angular.module('testModuleHapi').controller('testController', ['APIService', function(APIService){
  var self = this;
  self.apiService = APIService;
}]);
