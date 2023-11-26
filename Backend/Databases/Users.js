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
  const email = await User.findOne({ email: value });

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

async function register(username, email, password) {
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

async function login(which, value, password) {
  let token;
  if (which == "username") {
    const user = await User.findOne({ username: value });

    if (user) {
      if (user.password == password) {
        token = jwt.sign({ _id: user.id }, data.Jwt_key);
        return {
          token,
        };
      } else {
        return {
          msg: "Your data was incorrect",
        };
      }
    } else {
      return {
        msg: "Your data was incorrect",
      };
    }
  } else {
    const user = await User.findOne({ email: value });
    if (user) {
      if (user.password == password) {
        token = jwt.sign({ _id: user.id }, data.Jwt_key);

        return {
          token,
        };
      } else {
        return {
          msg: "Your data was incorrect",
        };
      }
    } else {
      return {
        msg: "Your data was incorrect",
      };
    }
  }
}

async function getuserbyjwt(userjwt) {
  const decode = jwt.verify(userjwt, data.Jwt_key);
  let user = await User.findOne({ _id: decode });
  return user;
}

async function addlink(id, linkdetail) {
  const user = await User.findById(id);
  let userlinks = user.links;
  userlinks.push(linkdetail);
  await User.findByIdAndUpdate(id, {
    $set: {
      links: userlinks,
    },
  });
  return {
    msg: "Link saved",
  };
}

async function uniqelink(id, fulllink) {
  const user = await User.findById(id);
 

  let userlinks = user.links;
  const check = userlinks.find((e) => {
    return e.fulllink === fulllink;
  });
  if (!check) {
    return true;
  } else {
    return false;
  }
}

async function removelink(userid, linkid) {
  const user = await User.findById(userid);
  let userlinks = user.links;
  const index = userlinks.findIndex((e) => {
    return e.id === linkid
  });
  userlinks.splice(index, 1);
  await User.findByIdAndUpdate(userid, {
    $set: {
      links: userlinks,
    },
  });
  return true
  
}

async function getlastfivelink(userid){
  const user = await User.findById(userid)
  return user.links.splice(0,5)
}

module.exports = {
  checkusername,
  checkemail,
  register,
  login,
  getuserbyjwt,
  addlink,
  uniqelink,
  removelink,
  getlastfivelink
};
