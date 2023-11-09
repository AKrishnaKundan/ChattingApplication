const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const { User } = require("./models/user.model");

const jwtOptions = {
    secretOrKey: "mysecret",
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
try{
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
    
}
catch(err){
    return done(err, false);
}
};

const jwtStrategy = new JWTStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};