var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var CategoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
   var categories = await CategoryModel.find({});
   res.render('admin/category/index', { categories });
})

router.get('/add', (req, res) => {
   res.render('admin/category/add');
})

router.post('/add', async (req, res) => {
   var category = req.body;
   await CategoryModel.create(category);
   res.redirect('/category');
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   var category = await CategoryModel.findById(id);
   await CategoryModel.deleteOne(category);
   res.redirect('/category');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = await CategoryModel.findById(id);
   res.render('admin/category/edit', { category });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = req.body;
   try {
      await CategoryModel.findByIdAndUpdate(id, category);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/category');
})

module.exports = router;