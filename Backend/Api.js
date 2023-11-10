const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const userDB = require("./Databases/Users");

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

app.listen(3000, () => console.log("listen"));
