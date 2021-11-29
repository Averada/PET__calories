const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");

const imgShema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  path: String,
});

module.exports = mongoose.model("Img", imgShema);
