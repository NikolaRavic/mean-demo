angular
    .module('adminApp', ['ngMaterial', 'ngAnimate', 'ui.router'])
    .config(function($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider){

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('red');

        $stateProvider.state('admin',{
            url: '/admin',
            views: {
                "admin": {
                    controller: 'AdminController',
                    templateUrl: 'src/pages/admin/view/galery.html',
                    resolve: {
                        allImages: function (imageApiService) {
                            return imageApiService.images;
                        }
                    }
                }
            }


        });

        $urlRouterProvider.otherwise('/admin');

    }).run(run);

    run.$inject = ['imagesApiService'];

    function run(imagesApiService) {
        imagesApiService.getAllImages();
        console.log('Angular runs!')
    }