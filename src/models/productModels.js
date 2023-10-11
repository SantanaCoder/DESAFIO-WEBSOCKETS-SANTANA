const mongoose = require("mongoose")



const productCollection = "productos"



const userSchema= new mongoose.Schema({
    titulo: {type: String, max:20, required:true},
    descripcion:{type:String, max:30, required:true}, 
    precio:{type:Number, max:50, required:true},
    stock:{type:Number, max:50, required:true}


})

const productModel = new mongoose.model(productCollection, userSchema)

module.exports = {productModel}
