var express = require('express')
var router = express.Router();


var ret = []
router.get('/', function(req, res, next){
    var copyOfSpend = SpendXPoints()

    let ledger = FillLedger(copyOfSpend)
    //loop through map entries creating JSON data to send back
    
    for(let [key, value] of ledger){
        const data = {
            [key] : value
        }
        ret.push(data)
    }
    res.send(ret)
});

function FillLedger(data){
    let map = new Map()
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        if(map.has(element.payer)){
            const oldVal = map.get(element.payer)
            map.set(element.payer, oldVal + element.points)
        }
        else{
            map.set(element.payer.toString(), element.points)
        }
    }
    
    return map
}


/******* UNDER THIS IS COPY OF users.js ********/
//This function essentially copies what happens at the /users endpoint under users.js
//for the sake of this I will copy what it does since we do not have access to a database
class Person {
    constructor(payer, points){
      this.payer = payer
      this.points = points
    }
}

function SpendXPoints(){
    var points = 5000;
    var retArray = []

    var accounting = [ { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
{ "payer": "DANNON", 
  "points": -200, 
  "timestamp": "2020-10-31T15:00:00Z" 
},

{ "payer": "MILLER COORS", 
  "points": 10000,
  "timestamp": "2020-11-01T14:00:00Z" 
},
    { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" } ]


    accounting.sort((a,b) => {
        return (a.timestamp < b.timestamp) ? -1 : ((a.date > b.date) ? 1 : 0)
    });

    for (let index = 0; index < accounting.length; index++) {
        if(points > 0){
            /*
                Case A: points > points of payer, subtract from points
                Case B: points < points of payer, subtract points from payer
                Case C: the points from payer are < 0 indicating we need to add back to points
                Case B & C are the same because were adding positive and negative values
            */
            if(points < accounting[index].points){
                retArray.push(new Person(accounting[index].payer, -1 * points))
                accounting[index].points -= points
                points = 0
            }
            else{
                //person is already in retArray update their points theyve put in
                if(retArray.find(element => element.payer == accounting[index].payer)){
                    const indexOfPerson = retArray.findIndex(person => person.payer == accounting[index].payer)
                    retArray[indexOfPerson].points -= accounting[index].points
                }
                else{
                    //first time weve seen the person
                    retArray.push(new Person(accounting[index].payer, -1 * accounting[index].points))
                    
                }
                points -= accounting[index].points
                accounting[index].points = 0;
            }
        }

    }
    //remove the copies under accounting
    return accounting;
}

module.exports = router;