app.factory('queryFactory', function($http){
    var factory = {};
    factory.getAllTags = function(auth, callback){
        var config = {
            headers: {
                Authorization: "Bearer "+auth.access_token,
                "Predix-Zone-Id": auth.predixZoneId,
                "content-type": "application/json"
            }
        };
        $http.get(auth.instanceUri+'/v1/tags', config).then(function(data){
            callback(data);
        });
    };
    factory.queryTags = function(query, callback){
        var config = {
            headers: {
                Authorization: "Bearer "+query.auth.access_token,
                "Predix-Zone-Id": query.auth.predixZoneId,
                "content-type": "application/json"
            }
        };
        $http.get(query.auth.instanceUri+'/v1/').then(function(data){
            callback(data)
        });
    }
    return factory;
})