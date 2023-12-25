var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   name: String,
   price: String,
   image: String,
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories'  
   }
});

var ToyModel = mongoose.model('toys', ToySchema); 
module.exports = ToyModel;