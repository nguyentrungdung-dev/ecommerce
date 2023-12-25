var mongoose = require('mongoose');
var CategoryModel = mongoose.Schema(
   {
      name: String,
      country: String
   });
var CategoryModel = mongoose.model('categories', CategoryModel);
module.exports = CategoryModel;