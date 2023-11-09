const userService = require("../services/user.service")

const getUsers = async(req, res)=>{
    try{
        let users = await userService.getUsers();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({"Message":"Internal Server Error"})
    }
}

module.exports = {getUsers};