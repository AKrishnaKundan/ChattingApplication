let userService = require("../services/user.service");
let authService = require("../services/authService");
let {generateAuthToken} = require("../services/token.service");

const register = async (req, res)=>{
    try{
        const user = await userService.createUser(req.body);
        const token = await generateAuthToken(user);
        res.status(201).json({_id:user._id, token});
    }
    catch(error){
        res.status(error.status).json({message :error.message});
    }
}

const login = async(req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const token = await generateAuthToken(user);
        res.status(200).json({_id:user._id, token});
    }
    catch(error){
        res.status(error.status).json({"message":error.message});
    }
}

module.exports = {
    register,
    login
}
