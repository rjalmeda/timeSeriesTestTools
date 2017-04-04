var WebSocketClient = require('websocket').client;
//var client = new WebSocketClient();
//client.on('connectFailed', function(err){
//    console.log(err.toString());
//});
//client.on('connect', function(connection){
//    console.log("WebSocket now Connected");
//    connection.on('error', function(err){
//        console.log(err.toString());
//    });
//    connection.on('close', function(){
//        console.log('WebSocket now Closed');
//    });
//    connection.on('message', function(message){
//        if(message.type === 'utf8'){
//            console.log("Received: "+ message.utf8Data);
//        };
//    });
//})
module.exports = (function(){
    return {
        ingestData: function(req,res){
            var statusCode = 0;
            var messages = [];
            var headers = {
                "Authorization": "Bearer "+req.body.server.access_token,
                "Predix-Zone-Id": req.body.server.predixZoneId,
                "client_id": "time_client",
                "Origin": "https://predix-timeseries-ingest-rjazuqua.run.aws-usw02-pr.ice.predix.io"
            };
            var newData = JSON.stringify(req.body.body);
//            console.log(headers);
            var client = new WebSocketClient();
            client.on('connectFailed', function(err){
                console.log(err.toString());
            });
            console.log(req.body.body);
            client.on('connect', function(connection){
                console.log("WebSocket now Connected");
                messages.push("WebSocket now Connected");
                connection.on('error', function(err){
                    console.log(err.toString());
                });
                connection.on('close', function(){
                    console.log('WebSocket now Closed');
                    messages.push("WebSocket now Closed");
                    return res.json({statusCode: statusCode, req:req.body, headers: headers, messages: messages})
                });
                connection.on('message', function(message){
                    if(message.type === 'utf8'){
                        console.log("Received: "+ message.utf8Data);
                        messages.push("Received: "+ message.utf8Data);
                        var messageData = JSON.parse(message.utf8Data);
//                        console.log(messageData.statusCode);
                        statusCode = messageData.statusCode;
                        connection.close();
                    };
                });
                connection.sendUTF(newData);
            });
            client.connect(req.body.server.uri, null, null, headers, null);
        }
    }
})();