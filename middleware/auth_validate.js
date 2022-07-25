const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  //fetch current headers
  console.log(req.headers);
  if (!req.headers.authorization) {
    //     return res
    //       .status(401)
    //       .json({ success: false, message: "Authentication needed." });
  }
  console.log("Scs", process.env.SESSION_SECRET);
  console.log(jwt.decode(req.headers.authorization.split(" ")[1]));
  //retrive the data from token
  next();
};
exports.checkAuth = checkAuth;
