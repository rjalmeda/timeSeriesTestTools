var timeSeriesController = require('./../controllers/timeSeriesController.js');
module.exports = function(app){
    app.post('/ingestData', function(req,res){
        timeSeriesController.ingestData(req,res);
    })
}