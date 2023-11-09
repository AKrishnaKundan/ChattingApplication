const jwt = require('jsonwebtoken');

const generateToken = (userId, expireTime)=>{
    let secret = "mysecret";
    try{
        const payload = {
            sub: userId,
            exp: expireTime,
            iat: Date.now()/1000
        }
        const token = jwt.sign(payload, secret);
        return token;
    }
    catch(err){
        throw {"status":500, "message":"Internal server error"}
    }
}

const generateAuthToken = async(user)=>{
    const {_id} = user;
    try{
        const expireTime = Math.floor(Date.now()/1000) + 30*60;
        const token = generateToken(_id, expireTime);
        const response = {
            token: token,
            expires: new Date(expireTime*1000)
        }
        return response;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    generateAuthToken
}