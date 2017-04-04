app.controller('indexController', function($scope, $location, indexFactory){
    $scope.newRequest = {};
    $scope.newRequest.body = [];
    $scope.newRequest.body[0] = {name: "", datapoints: ["null"]}; 
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
        };
        $scope.newRequest.messageId = unixTimeStamp;
        $scope.newRequest.attributes = newAttributes;
        $scope.newRequest.body[0].name = $scope.reqBody.name;
        $scope.newRequest.body[0].datapoints[$scope.newRequest.body[0].datapoints.length-1] = [
            unixTimeStamp,
            $scope.reqBody.value,
            $scope.reqBody.quality
        ];
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.addData = function(){
        var unixTimeStamp = Date.now();
        var newData = [unixTimeStamp, $scope.reqBody.value, $scope.reqBody.quality];
        $scope.newRequest.body[0].datapoints.splice(0,0, newData);
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    $scope.isValid = function(){
        console.log("does this actually work");
    };
    $scope.clearData = function(){
        $scope.newRequest.body[0].datapoints = ["null"];
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.ingestData = function(){
        $scope.socketStatus.status = "Ingesting " + Date.now() + "\n" + $scope.socketStatus.status;
//        console.log($scope.server);
        var package = {
            server: $scope.server,
            body: $scope.newRequest
        }
        indexFactory.ingestData(package, function(data){
            console.log(data);
            for (var i=0; i<data.data.messages.length; i++){
                $scope.socketStatus.status = data.data.messages[i] + "\n" + $scope.socketStatus.status;
            };
        })
    };
    $scope.clearLog = function(){
        $scope.socketStatus.status = "";
    };
});