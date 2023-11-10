const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const data = require("../default");

mongoose.connect(data.Database_adress).then(() => console.log("conect"));

const urlshorterschema = new mongoose.Schema({
  username: { type: String, required: true, uniqe: true, lowercase: true },
  email: { type: String, required: true, uniqe: true, lowercase: true },
  password: { type: String, required: true },
  links: [],
});
urlshorterschema.plugin(timestamp);

const User = mongoose.model("user", urlshorterschema);

async function checkusername(value) {
  const username = await User.findOne({ username: value });
  if (!username) {
    return {
      msg: "Availabe",
    };
  } else {
    return {
      msg: "This username already exists",
    };
  }
}

async function checkemail(value) {
  const email = await User.findOne({ email:value });

  if (!email) {
    return {
      msg: "Availabe",
    };
  } else {
    return {
      msg: "This email already exists",
    };
  }
}

async function register(username, email,password) {
  let token;
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
  token = jwt.sign({ _id: user.id }, data.Jwt_key);
  return {
    token: token,
  };
}

module.exports = {
  checkusername,
  checkemail,
  register
};
