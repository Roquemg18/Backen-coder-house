const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  orders: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Orders",
    },
  ],
});
module.exports = model("Users", userSchema);
