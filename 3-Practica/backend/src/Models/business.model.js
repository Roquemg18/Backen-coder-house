const { Schema, model, SchemaTypes } = require("mongoose");

const businessSchema = new Schema({
  name: String,
  products: {
    type: Array,
    default: [],
  },
});
module.exports = model("business", businessSchema);
