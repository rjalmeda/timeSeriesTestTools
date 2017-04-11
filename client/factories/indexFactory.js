app.factory('indexFactory', function($http){
    var factory = {};
    factory.ingestData = function(package, callback){
        $http.post('/ingestData', package).then(function(data){
            callback(data);
        })
    };
    return factory;
})