app.controller('authController', function($scope, $location, authFactory){
    $scope.auth = {uaa:"",clientId:"", clientSecret:"", instanceUri:"", predixZoneId:"", access_token: ""};
    $scope.importAuth = {blob:'{}'};
    $scope.render = {status: '', newAuth: ''};
    $scope.importAuth = function() {
        $scope.auth = JSON.parse($scope.importAuth.blob);
        $scope.render.newAuth = JSON.stringify($scope.auth, null, 2);
//        console.log($scope.importAuth.blob);
//        console.log($scope.auth);
    };
    $scope.checkAuth = function(){
        if(!$scope.auth){
            return console.log("Wheres you auth?");
        } else if (!$scope.auth.uaa){
            return console.log("You Need A UAA");
        } else if (!$scope.auth.clientId){
            return console.log("Client ID?");
        } else if (!$scope.auth.clientSecret){
            return console.log("Client Secret?");
        } else if (!$scope.auth.access_token){
            return console.log("Access token?")
        } else {
            authFactory.checkAuth($scope.auth, function(data){
                console.log(data);
                if(data.errors){
                    return $scope.render.status = JSON.stringify(data, null, 2);
                }
                $scope.render.status = JSON.stringify(data.data, null, 2);
            });
        };
    };
    $scope.getToken = function(){
        if(!$scope.auth){
            return console.log("Wheres you auth?");
        } else if (!$scope.auth.uaa){
            return console.log("You Need A UAA");
        } else if (!$scope.auth.clientId){
            return console.log("Client ID?");
        } else if (!$scope.auth.clientSecret){
            return console.log("Client Secret?");
        } else if (!$scope.auth.predixZoneId){
            return console.log("Predix Zone Id?");
        } else {
            authFactory.getToken($scope.auth, function(data){
                console.log(data);
                if(data.errors){
                    return $scope.render.status = JSON.stringify(data, null, 2);
                }
                $scope.render.status = JSON.stringify(data.data, null, 2);
                $scope.auth.access_token = data.data.access_token;
                $scope.render.newAuth = JSON.stringify($scope.auth, null, 2);
            });
        };
    }
});