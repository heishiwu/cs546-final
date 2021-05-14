const express = require('express');
const router = express.Router();
const data = require("../data");
const administrationData = data.administration;

router.get('/:id', async (req, res) =>{
    try{
        const adminInformation = await administrationData.getAdminById(req.params.id);
        res.json(adminInformation);
    }catch (e){
        res.status(404).json({error: 'admin not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const adminInformation = await administrationData.getAllAdmin();
        console.log(adminInformation)
        res.json(adminInformation);
    }catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) =>{
    let adminInfo = req.body;
    if(!adminInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {username, password} = adminInfo;
    if(!username){
        res.status(400).json({error: "You must input a username"});
    }
    if(!password){
        res.status(400).json({error: "You must input a password"});
    }

    try{
        const newAdmin = await administrationData.addAdmin(username, password);
        res.status(200).send(newAdmin);
    }catch (e){
        res.status(500).json({error:e});
    }
});



router.delete('/', async (req, res) =>{
    try{
        await administrationData.getAdminById(req.params.id);
    }catch (e){
        res.status(404).json({error: "No message found"});
    }

    try{
        const removeAdmin = await administrationData().removeAdminById(req.params.id);
        res.status(200).send(removeUser);
    }catch (e){
        res.status(500).json({ error: e });
    }
});



module.exports = router;