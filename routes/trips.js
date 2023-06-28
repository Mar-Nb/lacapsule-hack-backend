var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');

const Trip = require("../models/trips");
const moment = require("moment");
// const now= moment();
// console.log(now);
// const formattedDate = date.format("dddd, MMMM do YYYY, h:mm:ss a")
/* GET trips listing. */
router.get('/', (req, res) =>{
	Trip.find().then(dataTrip => {
		res.json({ trips: dataTrip });
	});
});
//get trips en fonction de departure
router.get("/departure/:departure", (req, res) => {
    Trip.find({
      departure: { $regex: new RegExp(req.params.departure, "i") }
    }).then((data) => {
        console.log(data);
      if (data) {
        res.json({ result: true, trips: data });
      } else {
        res.json({ result: false, error: "departure not found" });
      }
    });
  });

  //get trips en fonction de arrival
  router.get("/arrival/:arrival", (req, res) => {
    Trip.find({
      arrival: { $regex: new RegExp(req.params.arrival, "i") },
    }).then(data => {
      if (data) {
        res.json({ result: true, trips: data });
      } else {
        res.json({ result: false, error: "arrival not found" });
      }
    });
  });

//get trips en fonction de date
router.get("/date/:date", (req, res) => {
    const filter = {
      $gte: moment(req.params.date).startOf('day'),
      $lte: moment(req.params.date).endOf('day')
    };

    // console.log("DATE :", moment(req.params.date));
    Trip.find({ date: filter }).then(data => {
      // console.log("DATA: ", data);
      if (data) {
        res.json({ result: true, trips: data });
      } else {
        res.json({ result: false, error: "date not found" });
      }
    });
  });
//afficher trips en fonction des trois paramètre

function filterConstructor(req) {
  const filter = {};
  if (req.body.departure !== undefined) { filter["departure"] = new RegExp(req.body.departure, "i"); }
  if (req.body.arrival !== undefined) { filter["arrival"] = new RegExp(req.body.arrival, "i"); }
  if (req.body.date !== undefined) {
    filter["date"] = {
      $gte: moment(req.body.date).startOf("day"),
      $lte: moment(req.body.date).endOf("day")
    }
  }

  // On retourne false si aucun champ n'est rempli
  if (Object.keys(filter).length === 0) { filter = false; }
  return filter;
}

router.post("/sortByPrice", (req, res) => {
  // Construction du filtre
  const filter = filterConstructor(req);
  if (! filter) {
    res.json({ result: false, error: "Remplir au moins un champ" });
    return;
  }

  const sortOrder = { price: req.body.sortOrder ?? 1 };
  Trip.find(filter).sort(sortOrder).then(dataTrip => {
      res.json({ result: true, trips: dataTrip });
  });
});

router.post("/sortByDate", (req, res) => {
  const filter = filterConstructor(req);
  if (! filter) {
    res.json({ result: false, error: "Remplir au moins un champ" });
    return;
  }
  
  const dateOrder = { date: req.body.dateOrder ?? 1 };
  Trip.find().sort(dateOrder).then(dataTrip => {
      res.json({ trips: dataTrip });
  }); 
});

module.exports = router;



