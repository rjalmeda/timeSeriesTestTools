app.controller('queryController', function($scope, $location, $http, queryFactory){
    $scope.render = {results:"",auth:""};
    $scope.query = {};
    $scope.auth = {uaa:"",clientId:"", clientSecret:"", instanceUri:"", predixZoneId:""};
    $scope.submitQuery = function(){
        if(!$scope.query || !$scope.query.tags){
            return console.log("no tags dude");
        };
        var query = {
            auth: $scope.auth,
            query: $scope.query
        };
        queryFactory.submitQuery(query, function(data){
            console.log(data.data);
            $scope.render.results = JSON.stringify(data.data, null, 2);
        });
    };
    $scope.getAllTags = function(){
        queryFactory.getAllTags($scope.auth, function(data){
            console.log(data);
            $scope.render.tags = JSON.stringify(data.data.results, null, 2);
        })
    };
    $scope.submitLatestQuery = function(){
        if(!$scope.query || !$scope.query.tags){
            return console.log("no tags dude");
        };
        var query = {
            auth: $scope.auth,
            query: $scope.query
        };
        queryFactory.submitLatestQuery(query, function(data){
            console.log(data.data);
            $scope.render.results = JSON.stringify(data.data, null, 2);
        });
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
    $scope.importQuery = function(){
        $scope.query = JSON.parse($scope.rawQuery.string);
        $scope.render.query = JSON.stringify($scope.query, null, 2);
    };
    $scope.clearQueryResults = function(){
        $scope.render.results = '';
    };
    $scope.getAggregations = function(){
        console.log("getting Aggregations");
        queryFactory.getAggregations($scope.auth, function(data){
            console.log(data);
            $scope.render.aggregations = JSON.stringify(data.data.results, null, 2);
        })
    }
})