var express = require('express');
var router = express.Router();
const { filterConstructor } = require('../modules/utils');

const Trip = require("../models/trips");

// ROUTES TEST
router.get('/', (req, res) => {
  Trip.find().then(dataTrip => {
    res.json({ trips: dataTrip });
  });
});

// ROUTES TEST
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

// ROUTES TEST
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

// ROUTES TEST
router.get("/date/:date", (req, res) => {
  const filter = {
    $gte: moment(req.params.date).startOf('day'),
    $lte: moment(req.params.date).endOf('day')
  };

  Trip.find({ date: filter }).then(data => {
    if (data) {
      res.json({ result: true, trips: data });
    } else {
      res.json({ result: false, error: "date not found" });
    }
  });
});

// Renvoie les voyages triés par prix (croissant par défaut)
router.post("/sortByPrice", (req, res) => {
  // Construction du filtre
  const filter = filterConstructor(req);
  if (!filter) {
    res.json({ result: false, error: "Remplir au moins un champ" });
    return;
  }

  const sortOrder = { price: req.body.sortOrder ?? 1 };
  Trip.find(filter).sort(sortOrder).then(dataTrip => {
    res.json({ result: true, trips: dataTrip });
  });
});

// Renvoie les voyages triés par date (croissant par défaut)
router.post("/sortByDate", (req, res) => {
  const filter = filterConstructor(req);
  if (!filter) {
    res.json({ result: false, error: "Remplir au moins un champ" });
    return;
  }

  const dateOrder = { date: req.body.dateOrder ?? 1 };
  Trip.find(filter).sort(dateOrder).then(dataTrip => {
    res.json({ result: true, trips: dataTrip });
  });
});

module.exports = router;



