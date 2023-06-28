var express = require('express');
var router = express.Router();

const Commande = require("../models/commandes");
const Panier = require("../models/paniers");

// Récupération des commandes passées
router.get('/', function(req, res) {
  Commande.find().sort({ date: 1 }).then(commandes => {
    res.json({ result: true, trips: commandes });
  })
});

// Ajout des commandes + suppression du contenu du panier
router.post("/", function(req, res) {
  Panier.find().sort({ date: 1 }).then(trips => {
    for (const trip of trips) {
      const { departure, arrival, date, price } = trip;
      const newCommande = new Commande({ departure, arrival, date, price });
      newCommande.save().then(() => {
        Panier.deleteMany().then(() => {});
      });
    }
  });
});








module.exports = router;
