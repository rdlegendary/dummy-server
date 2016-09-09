(function(window, angular, undefined){
    angular.module("cvCapche", ['ngFileUpload']);
    
    angular.module("cvCapche").controller("verifyController", ['$scope', '$http', 'Upload',
    function(                                                   $scope,   $http,   Upload){
       //Variables
        $scope.file = undefined;
        
        $scope.getImage = function(){
            $http.get("/get-last-photo").then(function(response){
                console.log(response.data);
            })
        }
        
        
     function uploadImage(file){
         if (file){
                        Upload.upload({
                            url: '/update-validation-photo',
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