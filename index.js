require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRETadmin = "himanshu77";
const JWT_SECRETuser = "himanshu7777";
const b = require("bcrypt");
const mongoose = require("mongoose");
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");

function adminAuth(req, res, next) {
  const email = req.body.email;
  const token = jwt.sign(
    {
      email: email,
    },
    JWT_SECRETadmin
  );
}
function userAuth(req, res, next) {
  const email = req.body.email;
  const token = jwt.sign(
    {
      email: email,
    },
    JWT_SECRETuser
  );
}
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);
console.log(process.env.MONGO_URL);
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000);
  console.log("from index .js ");
}
main();
