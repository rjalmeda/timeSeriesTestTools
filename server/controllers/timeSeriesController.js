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
            var headers = {
                "Authorization": "Bearer "+req.body.server.access_token,
                "Predix-Zone-Id": req.body.server.predixZoneId,
                "client_id": "time_client",
                "Origin": "https://predix-timeseries-ingest-rjazuqua.run.aws-usw02-pr.ice.predix.io"
            };
            var newData = JSON.stringify(req.body.body);
            console.log(headers);
            var client = new WebSocketClient();
            client.on('connectFailed', function(err){
                console.log(err.toString());
            });
            console.log(req.body.body);
            client.on('connect', function(connection){
                console.log("WebSocket now Connected");
                connection.sendUTF(newData);
                connection.on('error', function(err){
                    console.log(err.toString());
                });
                connection.on('close', function(){
                    console.log('WebSocket now Closed');
                });
                connection.on('message', function(message){
                    if(message.type === 'utf8'){
                        console.log("Received: "+ message.utf8Data);
                    };
                });
            });
            client.connect(req.body.server.uri, null, null, headers, null)
            return res.json({message: "yay", req:req.body, headers: headers})
        }
    }
})();