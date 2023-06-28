var express = require('express');
var router = express.Router();

const Commande = require("../models/commandes");
const Panier = require("../models/paniers");

/* GET home page. */
router.get('/', function(req, res) {
  Commande.find().sort({ date: 1 }).then(commandes => {
    res.json({ result: true, trips: commandes });
  })
});

router.post("/", function(req, res) {
  // const ids = []
  // for (const id of req.body.ids) { ids.push(id); }

  Panier.find().sort({ date: 1 }).then(trips => {
    for (const trip of trips) {
      const { departure, arrival, date, price } = trip;
      const newCommande = new Commande({ departure, arrival, date, price });
      newCommande.save().then(() => {
        Panier.deleteMany().then(() => res.json({ result: true }));
      });
    }
  });
});








module.exports = router;
