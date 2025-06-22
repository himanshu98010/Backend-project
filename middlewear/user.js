const jwt = require("jsonwebtoken");
const { JWT_SECRET_USER } = require("../config");
function userMiddlewear(req, res, next) {
  const token = req.headers.token;
  const user = jwt.verify(token, JWT_SECRET_USER);
  if (user) {
    req.userId = user.id;
    next();
  } else {
    res.json({
      messege: "auth error",
    });
  }
}

module.exports = {
  userMiddlewear,
};
