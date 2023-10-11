const {Router} = require('express');
const {cartModel}= require('../models/cartModels')
const router = Router();


//GET
router.get('/', async(req, res)=>{
    try{
        let carts = await cartModel.find()
        res.send({result: "succes", payload: carts})
    }catch (error){
        console.log(error)
    }
})

//POST

router.post('/', async(req, res)=>{
    let{descripcion,cantidad,total} = req.body

    if(!descripcion||!cantidad||!total){
        res.send({status: "error", error:"faltan datos"}) 
    }
    let result = await cartModel.create({descripcion,cantidad,total})
    res.send({result: "succes", payload: result})
})


//PUT
router.put("/:uid", async(req, res)=>{
    let {uid} = req.params
    let cartToReplace =req.body
    if(!cartToReplace.nombre || !cartToReplace.apellido || !cartToReplace.email){
        res.send({status:"error", error: "no hay datos en parametros"})
    }
    let result = await cartModel.updateOne({_id: uid}, cartToReplace)
    res.send({result: " succes", payload: result})

})

//DELETE

router.delete("/:uid",async(req, res) =>{
    let{uid} = req.params
    let result= await cartModel.deleteOne({_id: uid})
    res.send({result: "succes", payload: result})
})

module.exports = router