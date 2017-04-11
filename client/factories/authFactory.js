app.factory('authFactory', function($http){
    var factory = {};
    
    factory.checkAuth = function(auth, callback){
        var passwordString = auth.clientId+':'+auth.clientSecret;
        var base64password = btoa(passwordString);
        var config = {
            headers: {
                Authorization: "Basic "+base64password,
                "content-type": "application/x-www-form-urlencoded"
            }
        };
        var requestBody = {token:auth.access_token};
//        return callback({config: config, requestBody: requestBody})
        $http.post(auth.uaa+'/check_token'+"?token="+auth.access_token, requestBody, config).then(function(data){
            callback(data);
        });
    };
    return factory;
})