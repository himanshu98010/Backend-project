const { Router } = require("express");
const { userMiddlewear } = require("../middlewear/user");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_USER } = require("../config");
const b = require("bcrypt");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const hasedpassword = await b.hash(password, 5);

  try {
    await userModel.create({
      email: email,
      password: hasedpassword,
      firstName: firstName,
      lastName: lastName,
    });

    res.status(200).json({
      messege: " signedup succeeded",
    });
  } catch (e) {
    res.status(403).json({
      messege: " signedup failed",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (user) {
    const userPassword = b.compare(password, user.password);
    if (userPassword) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET_USER
      );

      res.json({
        token,
      });
      console.log("token generated");
    } else {
      res.status(403).json({
        messege: "user doesn't exists",
      });
    }
  }
});

userRouter.get("/purchases", userMiddlewear, async function (req, res) {
  const userID = req.userID;
  const purchases = await purchaseModel.findOne({
    userID,
  });
  res.json({
    purchases,
  });
});

module.exports = {
  userRouter: userRouter,
};
