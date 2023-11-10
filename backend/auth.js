const passport = require("passport");

const auth = (req, res, next) => {
  console.log("jjjhbj");
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user || info) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.user = user; // Store the user object on the request for future middleware to access
    next(); // Continue to the next middleware or route handler
  })(req, res, next);
};

module.exports = auth;
