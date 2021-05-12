const express = require('express');
const router = express.Router();
const data = require("../data");
const administrationData = data.administration;

router.get('/:id', async (req, res) =>{
    try{
        const adminInformation = administrationData.getAdminById(req.params.id);
        res.json(adminInformation);
    }catch (e){
        res.status(404).json({error: 'Comment not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const adminInformation = administrationData.getAllAdmin();
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
        const newAdmin = await administrationData().addAdmin(username, password);
        res.status(200).send(newAdmin);
    }catch (e){
        res.status(500).json({error:e});
    }
});



router.delete('/', async (req, res) =>{
    let adminInfo = req.body;
    if(!adminInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {adminId} = adminInfo;
    try{
        await administrationData.getAdminById(adminId);
    }catch (e){
        res.status(404).json({error: "Admin not found"});
    }

    try{
        const deleteInfo = await administrationData.removeAdminById(adminId);
        res.status(200).send(deleteInfo);
    }catch (e){
        res.status(500).json({ error: e});
    }
});



module.exports = router;