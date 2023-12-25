var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');

/* GET users listing. */
router.get('/', async(req, res) => {
  var ToyModel = await ToyModel.find({}).populate('category');
  res.render('toy/index', { toys });
})

module.exports = router;
