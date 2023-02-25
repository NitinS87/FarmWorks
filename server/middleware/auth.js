const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("token");

    if (!token) return res.status(403).json("access denied");

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const verifyToken = (req, res, next) => {
//   const authHeaders = req.headers.token;
//   if (authHeaders) {
//     const token = authHeaders.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated");
//   }
// };

module.exports = verifyToken;
