var express = require('express'),
    bp = require('body-parser'),
    path = require('path');
var app = express();
var serverport = 8000;

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/bower_components')));
app.use(bp.json());

require('./server/config/routes.js')(app);

app.listen(serverport, function(){
    console.log(`listening on port ${serverport}`);
});

