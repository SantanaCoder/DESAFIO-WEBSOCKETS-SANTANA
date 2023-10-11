const {Router} = require('express');
const {productModel}= require('../models/productModels')
const router = Router();


//GET
router.get('/', async(req, res)=>{
    try{
        let products = await productModel.find()
        res.send({result: "succes", payload: products})
    }catch (error){
        console.log(error)
    }
})

//POST

router.post('/', async(req, res)=>{
    let{titulo,descripcion,precio,stock} = req.body

    if(!titulo||!descripcion||!precio||!stock){
        res.send({status: "error", error:"faltan datos"}) 
    }
    let result = await productModel.create({titulo,descripcion,precio,stock})
    res.send({result: "succes", payload: result})
})


//PUT
router.put("/:prd_id", async(req, res)=>{
    let {prd_id} = req.params
    let productToReplace =req.body
    if(!productToReplace.titulo || !productToReplace.descripcion || !productToReplace.precio || !productToReplace.stock){
        res.send({status:"error", error: "no hay productos"})
    }
    let result = await productModel.updateOne({_id: prd_id}, productToReplace)
    res.send({result: " succes", payload: result})

})

//DELETE

router.delete("/:prd_id",async(req, res) =>{
    let{prd_id} = req.params
    let result= await productModel.deleteOne({_id: prd_id})
    res.send({result: "succes", payload: result})
})

module.exports = router