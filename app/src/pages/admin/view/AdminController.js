(function(){

  angular
       .module('adminApp')
       .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope','images', 'eventBus','$mdDialog','imagesApiService'];

  function AdminController($scope, images, eventBus, $mdDialog, imagesApiService) {

      //Array of images that are fetched from backend, images are stored in a public folder. We are just passing url to be used to get image source
      $scope.images = images;

      //This is array in which points from all images are stored. We use this array for select option list to filter images by number of points
      $scope.pointsFilter=[];

      //load number of points for each image in order to use it in a filter
      $scope.images.forEach(function (image) {
          if($scope.pointsFilter.indexOf(image.points) === -1){
              $scope.pointsFilter.push(image.points);
          }
      });

      //Fn to send post request to move one image to archive folder and add points to all images that have less ID than image that is sent

      $scope.delete = function ($event, image, index) {

          var dialog = $mdDialog.confirm(
              {
                  title: 'Would you like to delete this image?',
                  textContent: 'The image is not deleted permanently, it is moved to archive folder.',
                  clickOutsideToClose:true,
                  targetEvent: $event,
                  hasBackdrop:false,
                  ok: 'Delete',
                  cancel: 'Cancel'
              });

          //Show confirmation dialog

          $mdDialog.show(dialog).then(function () {

              //'delete' one image and increment points to all images (in DB and view) that has ID less than image that we are deleting
              imagesApiService.deleteImage(image, index).then(function (payload) {

                  //This obj is used just to short-circuit forEach loop
                  var BreakForEachException = {};

                  $scope.images[index] = payload.data;

                  //Add 0 to points filter array
                  $scope.pointsFilter.unshift(0);

                  try {
                      $scope.images.forEach(function (image) {

                          if (image._id === payload.data._id) {
                              throw BreakForEachException;
                          }
                          if(image.archive ==="" ){ image.points++;}
                      });
                  }catch (e){
                      if (e!==BreakForEachExeption){ throw e}
                  }


              }, function (err) {
                      console.alert(err);
              });

          });

      };

      //triggers load of src url when applying filter

      $scope.triggerSrc = function () {
          eventBus.emit("trigger", 1);
      };
  }
})();
