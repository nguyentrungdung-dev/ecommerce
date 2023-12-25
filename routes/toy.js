var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');


router.get('/', async (req, res) => {
    var toys = await ToyModel.find({}).populate('category');
    res.render('admin/toy/index', { toys });
 })

 router.get('/add', async (req, res) => {
    var categories = await CategoryModel.find({});
    res.render('admin/toy/add', { categories });
 })
 
 router.post('/add', async (req, res) => {
    var toy = req.body;
    await ToyModel.create(toy);
    res.redirect('/toy');
 })

 router.get('/delete/:id', async (req, res) => {
    await ToyModel.findByIdAndDelete(req.params.id);
    res.redirect('/toy')
 })

 router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   var categories = await CategoryModel.find({});
   res.render('admin/toy/edit', { toy, categories });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   try {
      await ToyModel.findByIdAndUpdate(id, toy);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/toy');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var toys = await ToyModel.find({ name: new RegExp(keyword , "i") });
   res.render('admin/toy/index', { toys })
})

 module.exports = router;