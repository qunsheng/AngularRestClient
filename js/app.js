/************************************************************** 
 * 
 * This is main JavaScript file using Angular.js
 * 
 **************************************************************/ 

/************************************************************** 
 * 
 * Define an angular module for our app
 * Dependency: a service module which hide the details of 
 *             restful web service call for user 
 * 
 **************************************************************/ 
var sampleApp = angular.module('sampleApp', ['sampleApp.services']);
 
/************************************************************** 
 * 
 * Define Routing for app
 * 
 **************************************************************/ 
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
    }).
    when('/edit/:id', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
    }).
    when('/new', {
        templateUrl: 'partials/user-creation.html',
        controller: 'UserCreationCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);
 
 
/************************************************************** 
 * 
 * User list controller
 * 
 **************************************************************/ 
sampleApp.controller('UserListCtrl', function($scope, $location, UsersFactory) {

        $scope.users = [];
			
        // callback for ng-click 'editUser':
        $scope.editUser = function (userId) {
            $location.path('/edit/' + userId);
        };

        // callback for ng-click 'createUser':
        $scope.createNewUser = function () {
            $location.path('/new');
        };

	    UsersFactory.query().success(
				function(data, status) {
						console.dir(data);
	               	 	$scope.users  = data;
	            }
		).error(
				function(data, status) {
	               	 console.log("Error");
	            }
		);
	    console.info("scope users ", $scope.users);
});

 
/************************************************************** 
 * 
 * User detail controller
 * 
 **************************************************************/ 
sampleApp.controller('UserDetailCtrl', function($scope,   $location, $routeParams, UsersFactory) {
		console.log("user detail controller: "+$routeParams.id);
		$scope.user = {};		        

        // callback for ng-click 'updateUser':
        $scope.updateUser = function () {
        	console.log("update user: "+ $scope.user.age);
            UsersFactory.update($routeParams.id, $scope.user).success(
					function(data, status) {
	               	 	$scope.user  = data;
	            	}
		     )
	         .error(
				function(data, status) {
	               	 console.log("Error");
	            	}
		     );
            $location.path('/');
        };
        
        
        // callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
        	console.log("delete user...");
            UsersFactory.del($routeParams.id).success(
					function(data, status) {
	               	 	console.log("user deleted");
	            	}
		     )
	         .error(
				function(data, status) {
	               	 console.log("Error");
	            	}
		     );
            $location.path('/');
        };
        
		// retrieve user info
        UsersFactory.show($routeParams.id).success(
				function(data, status) {
						console.dir(data);
	               	 	$scope.user  = data;
	            }
		 ).error(
				function(data, status) {
	               	 console.log("Error");
	            }
		 );
        
	    console.info($scope.user);
});


 
/************************************************************** 
 * 
 * User creation controller
 * 
 **************************************************************/ 
sampleApp.controller('UserCreationCtrl', function($scope,  UsersFactory, $location) {
		console.log("user creation controller....");
	 	$scope.user ={};

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
        	console.info("create new user:", $scope.user);
            //$scope.create( );
               
            UsersFactory.create($scope.user).success(
					function(data, status) {
	               	 	$scope.user  = data;
	            	}
		     )
	         .error(
				function(data, status) {
	               	 console.log("Error");
	            	}
		     );
            $location.path('/');
        }
});

 
