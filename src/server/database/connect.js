require("dotenv").config({ path: __dirname + "/./../../../.env" });
const mongoose = require("mongoose");
const connectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tojpbuu.mongodb.net/Management?retryWrites=true&w=majority`;

const connectToMongoose = () => {
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb!");
  });
};

module.exports = connectToMongoose;
