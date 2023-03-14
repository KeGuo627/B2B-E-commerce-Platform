const mongoose = require("mongoose");
//product schema
/*
{
    Name: "Vintage car",
    Description: "fancy 90s car",
    Category: "category1",
    Price: "200000",
    Quantity: "300",
    Link: "https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp",
  },
*/
const productSchema = new mongoose.Schema(
  {
    index: {
      type: String,
      requried: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Category: {
      type: String,
    },
    Price: {
      type: String,
      requried: true,
    },
    Quantity: {
      type: String,
    },
    Link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = productSchema;
