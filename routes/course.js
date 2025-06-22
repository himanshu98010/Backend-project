const { Router } = require("express");
const { userMiddlewear } = require("../middlewear/user");
const { purchaseModel, courseModel, userModel } = require("../db");
const courseRouter = Router();
courseRouter.post("/purchase", userMiddlewear, async function (req, res) {
  const userID = req.userID;
  const courseId = req.body.courseId;
  await purchaseModel.create({
    userID,
    courseId,
  });
  res.json({
    messege: "course purchase successful",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses,
    messege: "course preview",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
