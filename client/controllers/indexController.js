app.controller('indexController', function($scope, $location, indexFactory){
    $scope.newRequest = {};
    $scope.newRequest.body = [];
    $scope.newRequest.body[0] = {name: "", datapoints: ["null"], attributes: {}}; 
    $scope.reqBody = {attributes: "{}"};
    $scope.socketStatus = {status:""};
    $scope.auth = {};
    $scope.newRequestHistory = [];
    $scope.rawData = {object: ""};
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
        $scope.newRequest.body[0].attributes = newAttributes;
        $scope.newRequest.body[0].name = $scope.reqBody.name;
        $scope.newRequest.body[0].datapoints[$scope.newRequest.body[0].datapoints.length-1] = [
            unixTimeStamp,
            $scope.reqBody.value,
            $scope.reqBody.quality
        ];
        $scope.newRequestHistory.push($scope.newRequest);
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.addData = function(){
        var unixTimeStamp = Date.now();
        var newData = [unixTimeStamp, $scope.reqBody.value, $scope.reqBody.quality];
        $scope.newRequest.body[0].datapoints.splice(0,0, newData);
        $scope.newRequestHistory.push($scope.newRequest);
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    $scope.isValid = function(){
        console.log("does this actually work");
    };
    $scope.clearData = function(){
        $scope.newRequest.body[0].datapoints = ["null"];
        $scope.newRequestHistory.push($scope.newRequest);
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.ingestData = function(){
        $scope.socketStatus.status = "Ingesting " + Date.now() + "\n" + $scope.socketStatus.status;
//        console.log($scope.server);
        var package = {
            auth: $scope.auth,
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
    $scope.importAuthJson = function(){
         var newAuth = JSON.parse($scope.authJSON.object);
        for (var key in newAuth){
            $scope.auth[key] = newAuth[key];
        }
    };
    $scope.importRawData = function(){
        if(!$scope.rawData.object){
            return console.log("what are you doing????");
        }
        try {
            $scope.newRequest = JSON.parse($scope.rawData.object);
        } catch (e) {
            return console.log("your import data is not a json object")
        };
        $scope.newRequestHistory.push($scope.newRequest);
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
        
    };
    $scope.resetData = function(){
        $scope.newRequestHistory.push($scope.newRequest);
        $scope.newRequest = {};
        $scope.newRequest.body = [];
        $scope.newRequest.body[0] = {name: "", datapoints: ["null"]}; 
        $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
    };
    $scope.undoEdit = function(){
        console.log("undo");
        if($scope.newRequestHistory.length > 0){
            console.log($scope.newRequest);
            $scope.newRequestHistory.pop()
            $scope.newRequest = $scope.newRequestHistory.pop();
            console.log($scope.newRequest);
            $scope.requestPreview = JSON.stringify($scope.newRequest, null, 2);
        } else {
            return console.log("can not undo anymore");
        }
    };
});