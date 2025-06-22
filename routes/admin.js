const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const b = require("bcrypt");
const { JWT_SECRET_ADMIN } = require("../config");
const { adminMiddlewear } = require("../middlewear/admin");

const { adminModel, courseModel } = require("../db");

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const hasedpassword = await b.hash(password, 5);

  try {
    await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email,
  });
  console.log(admin);
  console.log(JWT_SECRET_ADMIN);

  if (admin) {
    const passwordis = b.compare(password, admin.password);
    if (passwordis) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        JWT_SECRET_ADMIN
      );

      res.json({
        token,
      });
      console.log("token generated");
    } else {
      res.status(403).json({
        messege: "signin failed",
      });
    }
  }
});

adminRouter.post("/course", adminMiddlewear, async function (req, res) {
  const creatorID = req.adminId;
  const { title, description, imageUrl, price } = req.body;
  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorID,
  });

  res.json({
    messege: "course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddlewear, async function (req, res) {
  const creatorID = req.adminId;
  const { title, description, imageUrl, price, courseId } = req.body;
  await courseModel.updateOne(
    {
      id: courseId,
      creatorID,
    },
    {
      title,
      description,
      imageUrl,
      price,
    }
  );

  res.json({
    messege: "course updated",
  });
});

adminRouter.get("/bulk/course", adminMiddlewear, async function (req, res) {
  const creatorID = req.adminId;
  const courses = await courseModel.find({
    creatorID,
  });
  res.json({
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
