var express = require('express');
var router = express.Router();

const Panier = require("../models/paniers");

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  Panier.find().sort({ date: 1 }).then(trips => {
    res.json({ result: true, trips });
  });
});

router.delete("/:id", function(req, res) {
  Panier.deleteOne({ _id: req.params.id }).then(result => {
    res.json({ result: result.deletedCount === 1 });
  });
});






module.exports = router;
