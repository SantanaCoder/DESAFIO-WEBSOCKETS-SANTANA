const mongoose = require("mongoose")

const cartsCollection = "carts"



const userSchema= new mongoose.Schema({
    descripcion: {type: String, max:20, required:true},
    cantidad:{type:String, max:30, required:true}, 
    total:{type:String, max:50, required:true}
})

const cartModel = new mongoose.model(cartsCollection, userSchema)

module.exports = {cartModel}
