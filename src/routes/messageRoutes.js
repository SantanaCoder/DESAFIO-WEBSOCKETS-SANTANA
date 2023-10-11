const {Router} = require('express');
const {messageModel}= require('../models/messageModels')
const router = Router();


//GET
router.get('/', async(req, res)=>{
    try{
        let message = await messageModel.find()
        res.send({result: "succes", payload: message})
    }catch (error){
        console.log(error)
    }
})

//POST

router.post('/', async (req, res) => {
    let { usuario, message } = req.body;

    if (!usuario || !message) {
        res.send({ status: "error", error: "Faltan datos" });
    }

    try {
        let result = await messageModel.create({ usuario, message });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "error", payload: "Error al crear el mensaje" });
    }
});

//PUT
router.put("/:ms_id", async(req, res)=>{
    let {ms_id} = req.params
    let messageToReplace =req.body
    if(!messageToReplace.usuario || !messageToReplace.message){
        res.send({status:"error", error: "no hay datos"})
    }
    let result = await messageModel.updateOne({_id: ms_id}, messageToReplace)
    res.send({result: " succes", payload: result})

})

//DELETE

router.delete("/:ms_id",async(req, res) =>{
    let{ms_id} = req.params
    let result= await messageModel.deleteOne({_id: ms_id})
    res.send({result: "succes", payload: result})
})

module.exports = router