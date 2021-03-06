'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var service = angular.module('dolphin.services', []).value('version', '0.1');

service.factory('userService', [ '$http', function($http) {

  var currentUser = false;

  $http.get("/api/whoami").success(function(data) {
    currentUser = data;
  }).error(function() {
    currentUser = false;
  });

  return {
    name : 'User Service',

    login : function(user) {
      return $http.post("/api/login", user).success(function(data) {
        currentUser = data;
      });
    },

    logout : function() {
      return $http.post("/api/logout", {}).success(function() {
        currentUser = false;
      });
    },

    currentUser : function() {
      return currentUser;
    },

    avatarUrl : function() {
        return "/api/avatar";
    }

  };

} ]);
