var express = require('express');
var router = express.Router();

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

class Person {
  constructor(payer, points){
    this.payer = payer
    this.points = points
  }
}

//empty array that we will fill with payers for amount (points)
var retArray = []

/* GET users listing. */
router.get('/', function(req, res, next) {
  //sort accounting by timestamp so we get oldest payers points first
  accounting.sort((a,b) => {
    return (a.timestamp < b.timestamp) ? -1 : ((a.date > b.date) ? 1 : 0)
  });

  //take req.query.points
  var points = req.query.points

  //loop through accounting adding payers to response if they can pay for points
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
        accounting[index].points = 0
     }
    }

  }
  //return the array of transactions that took place
  res.send(retArray);
});

module.exports = router;
