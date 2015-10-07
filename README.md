# angular-rest-helper
[![Build Status](https://travis-ci.org/orionstein/angular-rest-helper-service.svg?branch=master)](https://travis-ci.org/orionstein/angular-rest-helper-service)

#### What is it?
angular-rest-helper is a Rest helper for Angular, to help work with Express and :notated APIs in a more sensible way.
It allows you to store and format your endpoints as they appear in backend route definitions, and populate the route params with JSON.

#### Configuration
Include 
**bower_components/angular-rest-helper-service/dist/angular-rest-helper.min.js**

Include **angularRestHelper** module in your Angular App, and inject APIService to make calls.

Call **APIServiceProvider** in app config, and set
```
APIServiceProvider.apiUrl = 'https://APIBASEURL';
```

and if you are using hapi
```
APIServiceProvider.formatter = 'hapi';
```

#### How to use

To make calls with this library, you can make calls in two ways.

Either through a single object, that contains an endpoint object, body object, params object, and headers object -
  ```
  var getUser = {
    endpoint: {
        path: '/user/:id',
        type: 'get'
    },
    params: {
      id: idVar
    },
    headers: {
      Authorization: "bearer " + token
    }
  }

  return APIService(getUser)
  .then(function(user){ return user });
  ```

Or through multiple arguments, in the order of APIService(endpoint, body, params, headers). If the request is a head or get request, the second argument will be used to populate the route params.
```
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
```
I find this useful for building into intermediary services, so you can expose a function updateUser in service userService:

```
function updateUser(userId, userData)
{
  var updateUserEndpoint = {
    path: '/user/:id',
    type: 'put'
  };
  return APIService(updateUserEndpoint, userData, {id: userId});
}
```

And call it from a controller or directive:
```
userService.updateUser(user.id, user)
.then(function(updatedUser){ scope.user = updatedUser) });
```

#### To Do
Add support for multiple API endpoints within the same App. Currently, only one API endpoint config can be active.
