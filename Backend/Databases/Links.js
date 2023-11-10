const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const data = require('../default')

mongoose.connect(data.Database_adress).then(() => console.log("conect"));

const urlshorterschema = new mongoose.Schema({
  creator: {},
  fulllink: { type: String, lowercase: true },
  shortlink: { type: String, lowercase: true },
  view: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  icn:'string'
});
urlshorterschema.plugin(timestamp);

const Link = mongoose.model("link", urlshorterschema);
