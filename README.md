# angular-rest-helper-service
Rest helper for Angular, to help work with Express and :notated APIs in a more sensible way

Include angular-rest-helper-service/dist/angular-rest-helper.js or angular-rest-helper.min.js

Include angularRestHelper module on Angular App load, and call APIService to make calls.

Call APIServiceProvider in app config, and set
APIServiceProvider.apiUrl = 'https://APIBASEURL';

and if you are using hapi

APIServiceProvider.formatter = 'hapi';


To make calls with this library, you can make calls in two ways.

The library is expecting two;


To make calls with this library, you can make calls in two ways.

Either through a single object, that contains an endpoint object, the body, and the params -

  var getUser = {
    endpoint: {
        path: '/user/:id',
        type: 'get'
    },
    params: {
      id: idVar
    }
  }

  return APIService(getUser)
  .then(function(user){ return user });

Or through multiple arguments, in the order of endpoint -> body -> params. If the request is a head or get request, the second argument will be used to populate the route params.

  var updateUserEndpoint = {
    path: '/user/:id',
    type: 'put'
  };

  var body = {
      name: 'Bob'
  };

  var params = {
    id: 12345
  }

  return APIService(updateUserEndpoint, body, params)
  .then(function(user){ return updatedUser; });

I find this useful for building into intermediary services, so you can expose a function updateUser in service userService:

function updateUser(userId, userData)
{
  var updateUserEndpoint = {
    path: '/user/:id',
    type: 'put'
  };
  return APIService(updateUserEndpoint, userData, {id: userId});
}

And call it from a controller or directive:
userService.updateUser(user.id, user)
.then(function(updatedUser){ scope.user = updatedUser) });

This way, routes can be written and referenced in the service exactly to API specifications, including route params, and be populated by the service.
