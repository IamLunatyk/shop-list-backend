const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  green: Boolean,
});

const ProductsDb = mongoose.model("products", schema);

module.exports = ProductsDb;
