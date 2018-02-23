angular.module('decode')
    .controller('HeaderCtrl', HeaderCtrl);
    
    HeaderCtrl.$inject = ['$http','$cookies', '$rootScope'];
    
    function HeaderCtrl($http, $cookies, $rootScope){
        var vm=this;
       $rootScope.session = $cookies.get('user');
       
        console.log("Controller works");
        $http.get('/api/posts')
            .success(function(posts){
            	console.log("Tapped");
                vm.posts = posts;
            })

        vm.logout  = function(){
            $http.post('/api/logout')
            .success(function(response){
                $rootScope.session = undefined;
            })
            .error(function(err){
                console.log(err);
            });
        }
        

    }