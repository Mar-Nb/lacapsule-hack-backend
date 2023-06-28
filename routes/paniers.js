var express = require('express');
var router = express.Router();

const Panier = require("../models/paniers");
const Trip = require("../models/trips");

// Récupération du contenu du panier
router.get('/', function(req, res) {
  Panier.find().sort({ date: 1 }).then(trips => {
    let total = 0;
    for (const trip of trips) { total += Number(trip.price) }
    res.json({ result: true, trips, total });
  });
});

// Suppression d'un article du panier
router.delete("/:id", function(req, res) {
  Panier.deleteOne({ _id: req.params.id }).then(result => {
    if (result.deletedCount === 1) {
      Panier.find().sort({ date: 1 }).then(trips => {
        let total = 0;
        for (const trip of trips) { total += Number(trip.price) }
        res.json({ result: true, trips, total });
      });
    } else {
      res.json({ result: false });
    }
  });
});

// Création d'un article dans le panier
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
