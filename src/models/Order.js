const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  client: {
    type: Schema.ObjectId,
    ref: "Client",
  },
  order: [
    {
      product: {
        type: Schema.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    }
  ],
  total: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema);