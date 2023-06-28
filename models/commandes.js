const mongoose = require('mongoose');
const commandeSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
   });
   
   const Commande = mongoose.model('commandes', commandeSchema);
   module.exports = Commande;