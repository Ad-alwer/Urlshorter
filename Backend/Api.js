const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const userDB = require("./Databases/Users");
const linkDB = require("./Databases/Links");

app.use(express.json());
app.use(cors());

//Register
app.get("/register/checkusername/:value", (req, res) => {
  userDB.checkusername(req.params.value).then((data) => res.send(data));
});

app.get("/register/checkemail/:value", (req, res) => {
  userDB.checkemail(req.params.value).then((data) => res.send(data));
});

app.post("/register", (req, res) => {
  userDB
    .register(req.body.username, req.body.email, req.body.password)
    .then((data) => res.send(data));
});
///

//Login

app.post("/login", (req, res) => {
  userDB
    .login(req.body.which, req.body.username, req.body.password)
    .then((data) => res.send(data));
});
//

//Home

app.get("/home/user/:jwt", (req, res) => {
  userDB.getuserbyjwt(req.params.jwt).then((data) => res.send(data));
});

app.post("/shortlink", async (req, res) => {
  const uniqe = await userDB.uniqelink(
    req.body.creator.userid,
    req.body.fulllink
  );

  if (uniqe) {
    linkDB.createlink(req.body.creator, req.body.fulllink).then((data) => {
      const linkdetail = {
        shortlink: data.shortlink,
        fulllink: data.fulllink,
        id: data._id,
      };
      userDB
        .addlink(req.body.creator.userid, linkdetail)
        .then((data) => res.send(data));
    });
  } else {
    return res.send({
      msg: "This link was created",
    });
  }
});

app.get("/home/link/:id", (req, res) => {
  linkDB.findlink(req.params.id).then((data) => res.send(data));
});

app.post("/home/link/delet", (req, res) => {
  linkDB.deletlink(req.body.linkid).then((data) => {
    if (data) {
      userDB.removelink(req.body.userid, req.body.linkid).then((data) => {
        res.send(data);
      });
    }
  });
});

app.get('/link/changestatus/:id',(req,res)=>{
  linkDB.changestatus(req.params.id).then(data=>res.send(data))
})

app.post('/link/changeurl',(req,res)=>{
 

  linkDB.changeurl(req.body.id,req.body.url).then(data=>res.send(data))
})

//

app.listen(3000, () => console.log("listen"));
