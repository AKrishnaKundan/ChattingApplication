const {User} = require("../models/user.model");

const getUsers = async()=>{
    try{
        const users = await User.find({}, 'username _id');
        return users;
    }   
    catch(err){
        throw {"status":500, "message":"Internal server error"}
    }
}

const createUser = async (user)=>{
    try{
        const emailTaken = await User.isEmailTaken(user.email);
        if (emailTaken){
            throw {status: 200, message:"Email already taken"};
        }
        const createdUser = await User.create(user);
        return createdUser;
    }
    catch(err){
        if (err.status == 200) throw err;
        throw {"status":500, "message":"Internal server error"}
    }
}

module.exports = {
    createUser, 
    getUsers
}