const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const data = require("../default");

mongoose.connect(data.Database_adress).then(() => console.log("conect"));

const urlshorterschema = new mongoose.Schema({
  creator: {},
  fulllink: { type: String, lowercase: true },
  shortlink: { type: String, lowercase: true },
  view: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});
urlshorterschema.plugin(timestamp);

const Link = mongoose.model("link", urlshorterschema);
function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

async function createlink(creator, fulllink) {
  let randomString = generateRandomString(8);
  const uniqelink = checkshortlink(randomString);
  while (!uniqelink) {
    randomString = generateRandomString(8);
  }
  let link = new Link({
    creator,
    fulllink,
    shortlink: randomString,
  });
  let result = await link.save();
  return result;
}

async function checkshortlink(val) {
  let shortlink = Link.findOne({ shortlink: val });
  if (shortlink) {
    return false;
  } else {
    return true;
  }
}

async function findlink(id) {
  const link = await Link.findById(id);
  return link;
}

async function deletlink(id) {
  await Link.findByIdAndRemove(id);
  return true;
}

async function changestatus(id) {
  const link = await Link.findById(id);
  const linkstatus = link.status;
  await Link.findByIdAndUpdate(id, {
    $set: {
      status: linkstatus == "active" ? "inactive" : "active",
    },
  });
  return true;
}

async function changeurl(id, fulllink) {
  await Link.findByIdAndUpdate(id, {
    $set: {
      fulllink,
    },
  });
  return true;
}

async function getlink(shortlink) {
  const link = await Link.findOne({ shortlink });
  console.log(link);
  if (link) {
   if(link.status == 'active'){
    await Link.updateOne({ _id: link._id }, { $inc: { view: 1 } });
    return link.fulllink;
   }
  }
}

module.exports = {
  createlink,
  findlink,
  deletlink,
  changestatus,
  changeurl,
  getlink
};
