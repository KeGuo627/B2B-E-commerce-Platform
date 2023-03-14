const mongoose = require("mongoose");

//mongodb => set up schema => set up model => use model to query and update entity in the database
/*

{
    email: "fasdns@gmail.com",
    password: "sdfE12@1",
    logined: false,
    cart: [],
    showAddCart: [false, false, false, false, false],
    buyQuant: [],
    discount: false,
  },

*/

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    logined: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    showAddCart: {
      type: Array,
      default: [false, false, false, false, false],
    },
    buyQuant: {
      type: Array,
      default: [],
    },
    discount: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
