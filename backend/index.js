let express = require("express");
let app = express();
let mongoose = require("mongoose");
let passport = require("passport");
let cors = require("cors");


const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const messageController = require("./controllers/message.controller");

const authMiddleware = require("./auth");

const { jwtStrategy } = require("./passport");

passport.use("jwt", jwtStrategy);

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let url = "mongodb+srv://akrishnakundan:akkchatapp1@cluster0.kdxq56g.mongodb.net/";

mongoose.connect(url)
.then(()=>{
    console.log("Connected to db");
})
.catch((err)=>{
    console.log(err);
})

app.post("/auth/register", authController.register);

app.post("/auth/login", authController.login);

app.get("/allusers", authMiddleware, userController.getUsers);

app.get("/messages", authMiddleware, messageController.getMessages);

app.post("/message", authMiddleware, messageController.sendMessage);

app.listen(3100, ()=>{
    console.log("Server started");
})