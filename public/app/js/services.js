'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var service = angular.module('dolphin.services', []).value('version', '0.1');

service.factory('userService', [ '$http', function($http) {

    var isEmpty = function(obj) {
        return Object.keys(obj).length === 0;
    };

    var currentUser = {};
    $http.get("/api/whoami").success(function(data) {
        currentUser = data;
    }).error(function() {
        currentUser = {};
    });

    return {
        name : 'User Service',

        login : function(user, onSuccess, onError) {
            $http.post("/api/login", user).success(function(data, status, headers, config) {
                onSuccess(data, status, headers, config);
            }).error(function(data, status, headers, config) {
                onError(data, status, headers, config);
            });
        },

        currentUser : function() {
            return currentUser;
        },

        isLoggedIn : function() {
            return !isEmpty(currentUser);
        }

    };

} ]);
