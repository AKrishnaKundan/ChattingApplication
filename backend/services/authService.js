const {User} = require("../models/user.model.js");

const loginUserWithEmailAndPassword = async(email, password)=>{
    try{
        const user = await User.findOne({email:email});
        if (!user){
            throw {status : 401, message:"Email not registered"};
        }
        if (user.password == password){
            return user;
        }
        else throw {status : 401, message:"Password not correct"};
    }
    catch(err){
        if (err.status == 401) throw err;
        else throw {"status":500, "message":"Internal Server Error"}
    }
}

module.exports = {loginUserWithEmailAndPassword};