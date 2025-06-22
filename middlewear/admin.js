const { JWT_SECRET_ADMIN } = require("../config");
const jwt = require("jsonwebtoken");

function adminMiddlewear(req, res, next) {
  const token = req.headers.token;
  const admin = jwt.verify(token, JWT_SECRET_ADMIN);
  if (admin) {
    req.adminId = admin.id;
    next();
  } else {
    res.json({
      messege: "auth error",
    });
  }
}

module.exports = {
  adminMiddlewear,
};
