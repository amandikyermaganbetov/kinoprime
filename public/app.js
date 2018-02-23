angular.module('decode',[
        'ui.router',
        'ngCookies'
    ])
    .config(routeConfig);
    
    routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    
    function routeConfig($stateProvider, $locationProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/index.html');
        
            
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/home.html',
                controller: 'HeaderCtrl',
                controllerAs: 'vm'
            })
            .state('news',{
                url:'/news',
                templateUrl: '/views/news.html',
                controller: 'NewsCtrl',
                controllerAs: 'vm'
            })
            .state('post', {
                url: '/post',
                templateUrl: '/views/post.html',
                controller: 'PostCtrl',
                controllerAs: 'vm'
            })
            .state('signup',{
                url: '/signup',
                templateUrl: '/views/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'vm'
            })
            .state('profile',{
                url: '/profile',
                templateUrl: '/views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm'
            })
            .state('createPost',{
                url: '/createPost',
                templateUrl: '/views/createPost.html',
                controller: 'CtrlCreatePost',
                controllerAs: 'vm'
            })









            
    }