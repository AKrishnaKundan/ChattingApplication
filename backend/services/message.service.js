const mongoose = require("mongoose");

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
        const message = new Message({"type":"send", "text":body.text, "timestamp": new Date()})
        let senderId = user._id;
        let receiverId = body.receiverId;
        await updateSender(message, senderId, receiverId);
        message.type = "received";
        await updateReceiver(message, receiverId, senderId);
        message.type="send";
        return message;
    }
    catch(err){
        throw {"status":500, "message": "Internal Server Error"}
    }
}

const updateSender = async(message, fromId, toId)=>{
    try{
        let senderChat = await userChat.getChatById(fromId);
        let receiverChat = senderChat.persons.find((receiver)=>{
            if (toId == receiver.receiverId){
                return receiver;
            }
        })

        if (!receiverChat){
            receiverChat = new singleChat({receiverId: toId, messages:[]})
            senderChat.persons.push(receiverChat);
        }
        receiverChat.messages.push(message);
        await senderChat.save();
    }
    catch(err){
        console.log(err);
        throw {"status":500, "message": "Internal Server Error"}
    }
}
const updateReceiver = async(message, fromId, toId)=>{
    try{
        let senderChat = await userChat.getChatById(fromId);
        let receiverChat = senderChat.persons.find((receiver)=>{
        
            if (toId.equals(receiver.receiverId)){
                return receiver;
            }
        })

        if (!receiverChat){
            receiverChat = new singleChat({receiverId: toId, messages:[]})
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