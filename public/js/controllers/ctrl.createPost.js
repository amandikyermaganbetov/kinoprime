angular.module('decode')
	.controller('CtrlCreatePost',CtrlCreatePost);

 	 CtrlCreatePost.$inject = ['$http','$cookies','$rootScope'];

 	 function CtrlCreatePost($http,$cookies,$rootScope){
 	 		var vm = this;
 	 		vm.showModalCreatePost = false;

 	 		vm.createPost = function(){
 	 			$http.post('/api/posts',{
 	 				title: vm.title,
 	 				content: vm.content
 	 			}).success(function(response){
 	 				alert('success');
 	 				console.log(response);
 	 			}).error(function(err){
 	 				console.log(err);
 	 			});

 	 		}
 	 } 	
