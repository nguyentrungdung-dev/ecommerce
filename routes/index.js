var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');

/* GET home page. */


router.get('/', async (req, res) => {
  var toys = await ToyModel.find({}).populate('category');
  res.render('user/index', { toys });
})

router.post('/search', async (req, res) => {
  var keyword = req.body.keyword;
  var toys = await ToyModel.find({ name: new RegExp(keyword , "i") });
  res.render('user/index', { toys })
})

module.exports = router;
