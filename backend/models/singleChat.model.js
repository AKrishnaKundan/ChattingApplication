
const mongoose = require("mongoose");
const {messageSchema} = require("./message.model");

const singleChatSchema = new mongoose.Schema({
    _id: false,
    receiverId: mongoose.ObjectId,
    messages : [messageSchema]
})

const singleChatModel = mongoose.model("singleChat", singleChatSchema);

module.exports = {singleChat: singleChatModel, singleChatSchema:singleChatSchema};