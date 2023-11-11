const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user || info) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }
    req.user = user; // Store the user object on the request for future middleware to access
    next(); // Continue to the next middleware or route handler
  })(req, res, next);
};

module.exports = auth;
