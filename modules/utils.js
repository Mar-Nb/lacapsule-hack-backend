const moment = require("moment");

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

module.exports= { filterConstructor };