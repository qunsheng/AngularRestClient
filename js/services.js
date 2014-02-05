
/************************************************************** 
 * 
 * This is reusable service module 
 * Which hide the details of restful web service call for user 
 * 
 * API:
 * show (id) : ajax call to retrieve user info for id
 * create (user): ajax call to create a new user
 * update (id, user): ajax call to update user
 * delete (id): ajax call to delete a user
 * query (): ajax call to retrieve all user info
 * 
 * for create/update method, used jQuery param 
 * to convert object to paramters
 * 
 **************************************************************/ 
var services = angular.module('sampleApp.services', []);

// Factory
sampleApp.factory('UsersFactory', function($http){
	// private variable save configuration detail
	var urlRoot = 'http://localhost:3000/users';
	// publish API
    return {
        show: function(id){
        	console.log("factory show "+id);
            return $http({method : 'GET',url : urlRoot+'/' + id});
        } ,
        create: function(user){
        	console.info("create user", user);
        	var transform = $.param(user);
            return $http({
	         	method : 'POST',
	         	url : urlRoot,
	         	data: transform,
	         	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	         });
        } ,
        update: function(id, user){
        	console.info("update user", id, user);
        	var transform = $.param(user);
            return $http({
	         	method : 'PUT',
	         	url : urlRoot+'/'+id,
	         	data: transform,
	         	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	         });
        } ,
        del: function(id){
        	console.log("factory del "+id);
            return $http({method : 'DELETE',url : urlRoot+'/' + id});
        } ,
        query: function() {
        	console.log("factory query...");
	        return $http({method : 'GET',url : urlRoot});
		}
    }              
});
