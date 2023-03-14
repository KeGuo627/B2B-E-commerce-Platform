const mongoose = require("mongoose");

const userSchema = require("./userschema");
const userInfo = mongoose.model("user", userSchema);
const productSchema = require("./productschema");
const productInfo = mongoose.model("product", productSchema);
module.exports = {
  userInfo,
  productInfo,
};
