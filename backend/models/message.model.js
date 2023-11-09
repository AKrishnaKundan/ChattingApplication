const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    _id: false,
    type: String,
    text: String,
    timestamp: Date
})

const messageModel = mongoose.model("Message", messageSchema);

module.exports = {Message: messageModel, messageSchema:messageSchema};