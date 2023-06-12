const { Schema, model, SchemaTypes } = require("mongoose");

const ordersSchema = new Schema({
  business: {
    type: SchemaTypes.ObjectId,
    ref: "Business",
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: "Users",
  },
  products: {
    type: Array,
    default: [],
  },
});
module.exports = model("orders", ordersSchema);
