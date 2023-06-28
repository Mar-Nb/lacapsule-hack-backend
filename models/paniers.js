const mongoose = require('mongoose');
const panierSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
   });
   
   const Panier = mongoose.model('paniers', panierSchema);
   module.exports = Panier;