var express = require('express');
var router = express.Router();


//for this route I am gonna use a smaller example
var accounting = [ { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }]


router.post('/', function(req, res, next) {
    //make sure query params are non-null
    if(req.query.name != null && req.query.points != null){

        //get name and points
        const name = req.query.name
        const points = req.query.points
        
        //construct data object
        const data = {
            "payer" : name,
            "points": points,
            "timestamp": new Date().toISOString()
        }

        //add to accounting array
        accounting.push(data)
        
        //send it back
        res.send(accounting)
    }
    else{
        res.send("missing a query parameter")
    }
    
});

module.exports = router;