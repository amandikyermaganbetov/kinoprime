angular.module('decode')
	.controller('PostCtrl',PostCtrl);

	PostCtrl.$inject = ['$http','$cookies','$rootScope'];
	
	function PostCtrl($http,$cookies,$rootScope){
		var vm = this;
		console.log('PostCtrl works in av');
		vm.login = function(){
			console.log('PostCtrl Works');
			$http.post('/api/login',{
				email: vm.email,
				password: vm.password
			}).success(function(response){
				$rootScope.session = $cookies.get('user');
				alert('Success login');
				console.log("Line done");
			}).error(function(err){
				alert('Authentication error');
			});
		}
	}