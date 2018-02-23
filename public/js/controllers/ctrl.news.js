angular.module('decode')
    .controller('NewsCtrl', NewsCtrl);
    
    NewsCtrl.$inject = ['$http'];
    
    function NewsCtrl($http){
        var vm=this;
       
        console.log("News works");
        $http.get('/news')
            .success(function(posts){
                console.log();
            	vm.posts = posts;
            })

    }