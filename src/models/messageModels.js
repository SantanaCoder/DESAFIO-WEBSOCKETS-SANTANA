const mongoose = require("mongoose")

const messageCollection = "messages"

const userSchema = new mongoose.Schema({
    usuario: {type: String, max:20, required:true},
    message: {type:String, max:30, required:true}, 
})

const messageModel = mongoose.model(messageCollection, userSchema)

module.exports = {messageModel};
