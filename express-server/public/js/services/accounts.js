angular.module('accountService', [])

	// super simple service
	// each function returns a promise object
	.factory('Accounts', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/accounts');
			},
			
			create : function(accountData) {
				return $http.post('/api/accounts', accountData);
			},
			
			save : function(accountData) {
				return $http.post('/api/accounts/save',accountData);
			},

			transfer : function(accountData) {
				return $http.post('/api/accounts/transfer',accountData);
			},

			delete : function(id) {
				return $http.delete('/api/accounts/' + id);
			},

			withdraw : function(accountData){
				return $http.post('/api/accounts/withdraw',accountData);
			}
		}
	}]);
