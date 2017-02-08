(function(){

  angular
       .module('adminApp')
       .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope','imagesApiService', '$mdDialog', '$mdToast'];

  function AdminController($scope, imagesApiService, $mdDialog, $mdToast) {


      $scope.images = imagesApiService.images;
      //test
      console.log($scope.images);

      $scope.delete = function (event, image, index) {
          var dialog = $mdDialog.confirm()
              .title('Would you like to delete this image?')
              .textContent('The image is not deleted permanently, it is moved to archive folder.')
              .targetEvent(event)
              .ok('Delete')
              .cancel('Cancel');

          $mdDialog.show(dialog).then(function () {

              imagesApiService.deleteImage(image, index).then(function (payload) {
                  console.log(image, payload);
                  $mdToast.show(
                      $mdToast.simple()
                          .textContent('Image ' + image + ' moved to archive!')
                          .hideDelay(2000)
                  );
              }, function (err) {
                      $mdToast.show(
                          $mdToast.simple()
                              .textContent('Error: ' + err)
                              .hideDelay(2000)
                      );
              });

          });
      };
  }
})();
