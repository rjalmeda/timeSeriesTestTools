app.controller('indexController', function($scope, $location, indexFactory){
    $scope.newRequest = {};
    $scope.reqBody = {attributes: "{}"};
    $scope.socketStatus = {status:""};
    $scope.updateBody = function(){
        var unixTimeStamp = Date.now();
        var newAttributes;
        if($scope.reqBody.attributes){
            try {
                JSON.parse($scope.reqBody.attributes);
            } catch (e) {
                return console.log("your attributes is not a json object")
            };
        };
        var newAttributes = JSON.parse($scope.reqBody.attributes);
        if(!isNaN(Number($scope.reqBody.value))){
            $scope.reqBody.value = Number($scope.reqBody.value);
        }
        $scope.newRequest = {
            messageId: unixTimeStamp,
            body: [
                {
                    name: $scope.reqBody.name,
                    datapoints: [
                        unixTimeStamp,
                        $scope.reqBody.value,
                        $scope.reqBody.quality
                    ]
                }
            ],
            attributes: newAttributes
            
        };
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    $scope.isValid = function(){
        console.log("does this actually work");
    };
    $scope.ingestData = function(){
        $scope.socketStatus.status = "Ingesting " + Date.now() + "\n" + $scope.socketStatus.status;
        console.log($scope.server);
        var package = {
            server: $scope.server,
            body: $scope.newRequest
        }
        indexFactory.ingestData(package, function(data){
            console.log(data);
        })
    };
    $scope.clearLog = function(){
        $scope.socketStatus.status = "";
    };
});