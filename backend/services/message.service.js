const {userChat} =  require("../models/userChat.model.js");
const {singleChat} = require("../models/singleChat.model.js") 
const {Message} = require("../models/message.model.js")


const getMessages = async(userId)=>{
    try{
        let messages = await userChat.getChatById(userId);
        return messages;
    }
    catch(err){
        throw {"status":500, "message": "Internal Server Error"}
    }
}

const updateMessage = async({body, user})=>{
    try{
        const message = new Message({"type":"send", "text":body.text, "timestamp": new Date(Date.now())})

        await updateSender(message, user._id, body.receiverId);
        message.type = "receive";
        await updateReceiver(message, body.receiverId, user._id);
        return {"status":200, "message": "Message Sent"}
    }
    catch(err){
        throw {"status":500, "message": "Internal Server Error"}
    }
}

const updateSender = async(message, senderId, receiverId)=>{
    try{
        let senderChat = await userChat.getChatById(senderId);
        let count = 0;
        let receiverChat = senderChat.persons.find((receiver)=>{
            count++;
            return receiver;
        })
        if (!receiverChat){
            receiverChat = new singleChat({receiverId: receiverId, messages:[]})
            senderChat.persons.push(receiverChat);
        }
        receiverChat.messages.push(message);
        await senderChat.save();
    }
    catch(err){
        throw {"status":500, "message": "Internal Server Error"}
    }
}

const updateReceiver = async(message, senderId, receiverId)=>{
    try{
        let senderChat = await userChat.getChatById(senderId);
        let count = 0;
        let receiverChat = senderChat.persons.find((receiver)=>{
            count++;
            return receiver;
        })
        if (!receiverChat){
            receiverChat = new singleChat({receiverId: receiverId, messages:[]})
            senderChat.persons.push(receiverChat);
        }
        receiverChat.messages.push(message);
        await senderChat.save();
    }
    catch(err){
        throw {"status":500, "message": "Internal Server Error"}
    }
}

module.exports = {getMessages, updateMessage};