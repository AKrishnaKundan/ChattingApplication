const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

userSchema.statics.isEmailTaken = async function(email){
    try{
        const user = await this.findOne({email:email});
        if (user) return true;
        return false;
    }
    catch(error){
        return false;
    }
}

userSchema.statics.userMessages = async function(userId){
    try{
        const user = await this.findOne({_id:userId});
        const messages = user.messages;
        return messages;
    }
    catch(error){
        throw error;
    }
}

const userModel = mongoose.model("User", userSchema);

module.exports = {User: userModel};