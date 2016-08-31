(function(window, angular, undefined){
    angular.module("cvCapche", ['ngFileUpload']);
    
    angular.module("cvCapche").controller("verifyController", ['$scope', 'Upload',
    function(                                                   $scope,   Upload){
       //Variables
        $scope.file = undefined;
        
        
     function uploadImage(file){
         if (file){
                        Upload.upload({
                            url: '/sendPicture',
                            method: 'POST',
                            file: file
                        }).progress(function(evt){
                            console.log("firing");
                        }).success(function(data){
                            $scope.matching = data.match;
                            console.log(data.match);
                        }).error(function(error){
                            console.log(error);
                        })
                    }
     }    
                                                        
    //Watch for new images
        $scope.$watch(function(){
            return $scope.file;
        }, function(){
            if ($scope.file){
                uploadImage($scope.file);
            }
        })
                                                
    }])
})(window, window.angular);