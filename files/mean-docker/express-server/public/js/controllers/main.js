angular.module('accountController', [])

	// inject the account service factory into our controller
	.controller('mainController', ['$scope','$http','Accounts', function($scope, $http, Accounts) {
		$scope.createForm = {};
		$scope.saveForm = {};
		$scope.transferForm = {};
		$scope.withdrawalForm={};
		$scope.managementForm={};
		$scope.interest=5;
		$scope.realInterest=0.05;
		$scope.interestForm={};
		$scope.inputInterestForm={};
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
			if ($scope.createForm.name != undefined&&$scope.createForm.name != "") {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Accounts.create($scope.createForm)

					// if successful creation, call our get function to get all the new accounts
					.success(function(data) {
						$scope.loading = false;
						$scope.createForm = {}; // clear the form so our user is ready to enter another
						$scope.accounts = data; // assign our new list of accounts
					});
			}else{
				alert("please complete your input");
			}
		};


		
		$scope.saveAccount = function() {
			
			// validate the saveForm to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.saveForm.name != undefined &&$scope.saveForm.name != "" &&
				$scope.saveForm.amount != null &&
                $scope.saveForm.amount >= 0) {
				$scope.loading = true;

				// call the save function from our service (returns a promise object)
				Accounts.save($scope.saveForm)

	 				// if successful creation, call our get function to get all the new accounts
					.success(function(data) {
						$scope.loading = false;
						$scope.saveForm = {}; // clear the form so our user is ready to enter another
						if(data[data.length-1]==-1) alert("账户余额不足");
						else if(data[data.length-1]==-2) alert("查无此人");
						else if(data[data.length-1]==-3) alert("invalid input!");
						data.pop();
						$scope.accounts = data; // assign our new list of accounts
					});
	 		}else{
				alert("invalid input!");
			}
	 	};

		 $scope.transferAccount = function() {

			// validate the transferForm to make sure that something is there
			// if form is empty, nothing will happen
			 if (($scope.transferForm.name1 != undefined) && ($scope.transferForm.name2 != undefined) &&
			 	($scope.transferForm.name1 != "") && ($scope.transferForm.name2 != "")&&
                 $scope.transferForm.amount != null && $scope.transferForm.amount >= 0) {
				$scope.loading = true;

				// call the save function from our service (returns a promise object)
				Accounts.transfer($scope.transferForm)

	 				// if successful creation, call our get function to get all the new accounts
					.success(function(data) {
						$scope.loading = false;
						$scope.transferForm = {}; // clear the form so our user is ready to enter another
						if(data[data.length-1]==-1) alert("账户余额不足");
						else if(data[data.length-1]==-2) alert("查无此人");
						else if(data[data.length-1]==-3) alert("invalid input!");
						data.pop();
						$scope.accounts = data; // assign our new list of accounts
					});
	 		}else{
				alert("invalid input!");
			}
	 	};


		$scope.withdrawalAccount=function(){
			if ($scope.withdrawalForm.name != undefined && $scope.withdrawalForm.name != ""&&
				$scope.withdrawalForm.amount != null
                && $scope.withdrawalForm.amount >= 0) {
				$scope.loading=true;
				Accounts.withdraw($scope.withdrawalForm).success(function(data){
					$scope.loading=false;
					$scope.withdrawalForm={};
					if(data[data.length-1]==-1) alert("账户余额不足");
					else if(data[data.length-1]==-2) alert("查无此人");
					else if(data[data.length-1]==-3) alert("invalid input!");
					data.pop();
					$scope.accounts=data;
				});
			}else{
				alert("invalid input!");
			}
		};

		$scope.managementAccount=function(){
			if ($scope.managementForm.name != undefined && $scope.managementForm.name != "" &&
				$scope.managementForm.amount != null ) {
				$scope.loading=true;
				Accounts.transmanage($scope.managementForm).success(function(data){
					$scope.loading=false;
					$scope.managementForm={};
					if(data[data.length-1]==-1) alert("账户余额不足");
					else if(data[data.length-1]==-2) alert("查无此人");
					else if(data[data.length-1]==-3) alert("invalid input!");
					data.pop();
					$scope.accounts=data;
				});
			}else{
				alert("invalid input!");
			}
		};

		$scope.updateSecondAccount=function(){
			$scope.loading=true;
			$scope.interestForm.val=$scope.realInterest;
			$scope.interestForm.list=$scope.accounts;
			Accounts.updateSecondAcc($scope.interestForm).success(function(data){
				$scope.loading=false;
				$scope.accounts=data;
			});
		};

		$scope.updateInterest=function(){
			$scope.loading=true;
			if($scope.inputInterestForm.val!=null&&$scope.inputInterestForm.val>=0){
				$scope.interest=$scope.inputInterestForm.val;
				$scope.realInterest=$scope.interest/100;
			}else{
				alert("invalid input!");
			}
			$scope.inputInterestForm={};
			$scope.loading=false;
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
