var WebSocketClient = require('websocket').client;

var headers = {
    "Authorization": "Bearer "+yourAccessToken,
    "Predix-Zone-Id": yourPredixZoneId,
    "client_id": yourClientId,
    "Origin": "http//localhost" //or whatever
};

var client = new WebSocketClient();

client.on('connectFailed', function(err){
    console.log(err.toString());
});

client.on('connect', function(connection){
    console.log("websocket now connected");
    connection.on('error', function(err){
        console.log(err.toString());
    });
    connection.on('close', function(){
        console.log("websocket now closed");
    });
    connection.on('message', function(message){
        if(message.type === 'utf8'){
            console.log('Received: '+message.utf8Data);
            console.log('Status Code: '+JSON.parse(message.utf8Data).statusCode);
            connection.close();
        }
    });
    connection.sendUTF(yourRequestBody);
});

client.connect(yourWebSocketURI, null, null, headers, null);