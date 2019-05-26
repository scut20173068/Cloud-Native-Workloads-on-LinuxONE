angular.module('accountController', [])

	// inject the account service factory into our controller
	.controller('mainController', ['$scope','$http','Accounts', function($scope, $http, Accounts) {
		$scope.createForm = {};
		$scope.saveForm = {};
		$scope.transferForm = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all accounts and show them
		// use the service to get all the accounts
		Accounts.get()
			.success(function(data) {
				$scope.accounts = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createAccount = function() {

			// validate the createForm to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.createForm.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Accounts.create($scope.createForm)

					// if successful creation, call our get function to get all the new accounts
					.success(function(data) {
						$scope.loading = false;
						$scope.createForm = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
			}
		};


		
		$scope.saveAccount = function() {

			// validate the saveForm to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.saveForm.name != undefined) {
				$scope.loading = true;

				// call the save function from our service (returns a promise object)
				Accounts.save($scope.saveForm)

	 				// if successful creation, call our get function to get all the new accounts
					.success(function(data) {
						$scope.loading = false;
						$scope.saveForm = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
	 		}
	 	};

		 $scope.transferAccount = function() {

			// validate the transferForm to make sure that something is there
			// if form is empty, nothing will happen
			if (($scope.transferForm.name1 != undefined)&&($scope.transferForm.name2 != undefined)) {
				$scope.loading = true;

				// call the save function from our service (returns a promise object)
				Accounts.transfer($scope.transferForm)

	 				// if successful creation, call our get function to get all the new accounts
					.success(function(data) {
						$scope.loading = false;
						$scope.transferForm = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
	 		}
	 	};



		// DELETE ==================================================================
		// delete a account after checking it
		$scope.deleteAccount = function(id) {
			$scope.loading = true;

			Accounts.delete(id)
				// if successful creation, call our get function to get all the new accounts
				.success(function(data) {
					$scope.loading = false;
					$scope.accounts = data; // assign our new list of accounts
				});
		};
	}]);
