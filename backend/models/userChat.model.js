const mongoose = require("mongoose");
const {singleChatSchema} = require("./singleChat.model")

const userChatSchema = new mongoose.Schema({
	persons: [singleChatSchema]
})

userChatSchema.statics.getChatById = async function (userId){
    try{
        let chat = await this.findOne({_id:userId});
        if (!chat){
            chat = await this.create({"_id":userId, "persons": []})    
        }
        return chat;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

const userChatModel = mongoose.model("userChat", userChatSchema);

module.exports = {userChat: userChatModel, userChatSchema: userChatSchema};