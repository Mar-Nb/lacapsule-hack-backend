var express = require('express');
var router = express.Router();

const Panier = require("../models/paniers");
const Trip = require("../models/trips");

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  Panier.find().sort({ date: 1 }).then(trips => {
    res.json({ result: true, trips });
  });
});

router.delete("/:id", function(req, res) {
  Panier.deleteOne({ _id: req.params.id }).then(result => {
    if (result.deletedCount === 1) {
      Panier.find().sort({ date: 1 }).then(trips => {
        res.json({ result: true, trips });
      });
    } else {
      res.json({ result: false });
    }
  });
});

router.post("/", function(req, res) {
  Trip.findById(req.body.id).then(trip => {
    const newTrip = new Panier({
      departure: trip.departure,
      arrival: trip.arrival,
      price: trip.price,
      date: trip.date
    });

    newTrip.save().then(() => res.json({ result: true }));
  });
});




module.exports = router;
