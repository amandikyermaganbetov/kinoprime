angular.module('decode')
	.controller('SignupCtrl',SignupCtrl);

	SignupCtrl.$inject = ['$http','$cookies','$rootScope'];

	function SignupCtrl($http,$cookies,$rootScope){
		var vm  = this;
		console.log('Signup Works');
		vm.signUp  = function(){
			$http.post('/api/signup',{
				email: vm.email,
				name: vm.name,
				password: vm.password
			})
			.success(function(response){
				console.log(response);
				alert('Success');
			})
			.error(function(err){
				console.log(err);
				alert('Error is occured');
			})
		}
	}	