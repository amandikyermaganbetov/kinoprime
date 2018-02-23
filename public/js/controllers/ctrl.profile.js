angular.module('decode')
	.controller('ProfileCtrl',ProfileCtrl);

	ProfileCtrl.$inject = ['$http'];

	function ProfileCtrl($http){
		var vm = this;
		vm.showmodal = false;
		$http.get('/api/profile')
			.success(function(response){
				vm.profile = response;
				console.log(response);
			})
			.error(function(err){
				console.log(err);
			})
	}