app.controller('queryController', function($scope, $location, $http, queryFactory){
    $scope.render = {results:"",auth:""};
    $scope.query = {};
    $scope.auth = {uaa:"",clientId:"", clientSecret:"", instanceUri:"", predixZoneId:""};
    $scope.queryTags = function(){
        if(!$scope.query || !$scope.query.tags){
            return console.log("no tags dude");
        };
        var query = {
            auth: $scope.auth,
            tags: $scope.query.tags
        };
        queryFactory.queryTags(query, function(data){
            console.log(data);
        });
    };
    $scope.getAllTags = function(){
        queryFactory.getAllTags($scope.auth, function(data){
            console.log(data);
            $scope.render.tags = JSON.stringify(data.data.results, null, 2);
        })
    };
    $scope.checkToken = function(){
        console.log("check auth");
    };
    $scope.getNewToken = function(){
        console.log("get new token");
    };
    $scope.clearRenderResults = function(){
        $scope.render.results = "";
    };
    $scope.clearRenderAuth = function(){
        $scope.render.auth = "";
    };
    $scope.importAuthJson = function(){
         var newAuth = JSON.parse($scope.authJSON.object);
        for (var key in newAuth){
            $scope.auth[key] = newAuth[key];
        }
    };
})