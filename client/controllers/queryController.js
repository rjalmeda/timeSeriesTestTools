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
        var testAuth = {
            "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJmZmIyZGE2ZTY2YmI0YTkwYjY1ZTk0MmJhZmQwNzc2ZCIsInN1YiI6InRpbWVfY2xpZW50Iiwic2NvcGUiOlsidGltZXNlcmllcy56b25lcy4wMDE0YTJmNy0yNzFkLTQ5ZWUtOWJlNC03OGYyNzc1YzE1N2EucXVlcnkiLCJ1YWEucmVzb3VyY2UiLCJvcGVuaWQiLCJ1YWEubm9uZSIsInRpbWVzZXJpZXMuem9uZXMuMDAxNGEyZjctMjcxZC00OWVlLTliZTQtNzhmMjc3NWMxNTdhLnVzZXIiLCJ0aW1lc2VyaWVzLnpvbmVzLjAwMTRhMmY3LTI3MWQtNDllZS05YmU0LTc4ZjI3NzVjMTU3YS5pbmdlc3QiXSwiY2xpZW50X2lkIjoidGltZV9jbGllbnQiLCJjaWQiOiJ0aW1lX2NsaWVudCIsImF6cCI6InRpbWVfY2xpZW50IiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiJlNDY2NGRjOSIsImlhdCI6MTQ5MTMyODIzMSwiZXhwIjoxNDkxMzcxNDMxLCJpc3MiOiJodHRwczovLzdmODJhZGIwLTBhNDMtNDJiYS04NTRkLTQ2NzkwYjMzN2Q2MC5wcmVkaXgtdWFhLnJ1bi5hd3MtdXN3MDItcHIuaWNlLnByZWRpeC5pby9vYXV0aC90b2tlbiIsInppZCI6IjdmODJhZGIwLTBhNDMtNDJiYS04NTRkLTQ2NzkwYjMzN2Q2MCIsImF1ZCI6WyJ0aW1lX2NsaWVudCIsInVhYSIsIm9wZW5pZCIsInRpbWVzZXJpZXMuem9uZXMuMDAxNGEyZjctMjcxZC00OWVlLTliZTQtNzhmMjc3NWMxNTdhIl19.eR0sLK3xyzCL8rYgnlYFpPphL0LVh26pbWSfKccJlBYd-e7ckUAb8HVf-BxCly6jVMg3q65dMF2qsBa9R6co41UopdOxbM_7bxP1mpgC3W0C6DPwxvh64JibOiGrNl6aotzaL2QKp-yUuolF9N9V6XngJXGzV-IblVjL4hsdsFwg8qE6ZQEofhfmugopkaXurfGAJTV8SJciUNyn74UAkl4or8WHo80Ztv2K2j30YtgI7Rvj-TEV61vSwlvYnd0irPmFKhjpScoidQv90N8SOn-TmL4NO9N5xZjU4gHo8XJhBH-oICg1yLmuxbuyPUgb811juy3HBu9afaj9xCzdXw",
            "predixZoneId": "0014a2f7-271d-49ee-9be4-78f2775c157a",
            instanceUri: "https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io"
        }
        queryFactory.getAllTags(testAuth, function(data){
            console.log(data);
            $scope.render.results = JSON.stringify(data.data.results, null, 2);
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
})