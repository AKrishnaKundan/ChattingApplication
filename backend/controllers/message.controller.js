const messageService = require("../services/message.service.js")

const getMessages = async(req, res)=>{
    try{
        const messages = await messageService.getMessages(req.user._id);
        console.log(messages);
        res.json(messages);
    }
    catch(err){
        res.status(500).json({"message":"Internal Server Error"})
    }
}

const sendMessage = async(req, res)=>{
    try{
        console.log("controller");
        const message = await messageService.updateMessage(req);
        res.json({"status":200, "message":"hiji"})
    }
    catch(err){
        res.status(500).json({"message":"Internal Server Error"})
    }
}

module.exports = {getMessages, sendMessage}