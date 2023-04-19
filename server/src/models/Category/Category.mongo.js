const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  icon: {
    type:String,
  },
  color: {
    type:String,
  },
});

const categoryModel = mongoose.model('Category',categorySchema);

module.exports=categoryModel;


