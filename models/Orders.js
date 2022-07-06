const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order_id: String,
  store_name: String,
  quantity: Number,
  date_of_delivery: Date,
  price: Number,
  product: String,
});

const Orders = mongoose.model("Order", orderSchema);

module.exports = Orders;
