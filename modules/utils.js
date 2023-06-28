const moment = require("moment");

// Gestion des filtres à passer aux requêtes Mongoose (évite les empty strings)
function filterConstructor(req) {
    const filter = {};
    if (req.body.departure) { filter["departure"] = new RegExp(req.body.departure, "i"); }
    if (req.body.arrival) { filter["arrival"] = new RegExp(req.body.arrival, "i"); }
    if (req.body.date) {
      filter["date"] = {
        $gte: moment(req.body.date).startOf("day"),
        $lte: moment(req.body.date).endOf("day")
      }
    }
  
    // On retourne false si aucun champ n'est rempli
    if (Object.keys(filter).length === 0) { filter = false; }
    return filter;
}

module.exports= { filterConstructor };