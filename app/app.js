angular
    .module('adminApp', ['ngMaterial', 'ngAnimate', 'ngRoute'])
    .config(function($mdThemingProvider, $mdIconProvider, $routeProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('yellow')
            .warnPalette('red');

        $routeProvider
            .when('/admin',{
                templateUrl: 'src/pages/admin/view/galery.html',
                controller: 'AdminController'
            }).otherwise({
                redirectTo: '/admin'
        });

    }).run(run);

    run.$inject = ['imagesApiService'];

    function run(imagesApiService) {
        imagesApiService.getAllImages();
        console.log('Angular runs!')
    }