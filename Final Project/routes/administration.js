const express = require('express');
const router = express.Router();
const data = require("../data");
const administrationData = data.administration;
const bcrypt = require('bcrypt');
const saltRounds = 16;

router.get('/account', async (req, res) =>{
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

router.post('/updateAdminUsername', async (req, res) =>{
    let username = req.body.username;
    let adminId = req.body._id
    if(!username){
        res.status(400).json({error: "You must input a username"});
    }
    if(!adminId){
        res.status(400).json({error: "You must input a adminId"});
    }

    try{
        const newAdmin = await administrationData.updateAdminUsername(adminId,username);
        res.status(200).send(newAdmin);
    }catch (e){
        res.status(500).json({error:e});
    }
});

router.delete('/', async (req, res) =>{
    try{
        await administrationData.getAdminById(req.body._id);
    }catch (e){
        res.status(404).json({error: "Could not delete the admin"});
    }

    try{
        const removeAdmin = await administrationData.removeAdminById(req.body._id);
        res.status(200).send(removeAdmin);
    }catch (e){
        res.status(500).json({ error: e });
    }
});

//login and logout
router.get('/login', async (req, res) =>{
    if(req.session.adminId){
        return res.redirect('/private');
    }
    else {
        res.render('admin/adminLogin', {
            title: 'admin Login',
            partial: 'login-script'
        });
    }
});

router.post('/login', async (req, res) =>{
    if(req.session.adminId){
        return res.redirect('/private');
    }
    else {
        let {username, password} = req.body;
        // const username = xss(req.body.username.trim());
        // const password = xss(req.body.password.trim());
        const allAdmin = await administrationData.getAllAdmin();
        for(let x of allAdmin){
            if(username === x.username){
                console.log(await bcrypt.compare(password, x.password))
                if(await bcrypt.compare(password, x.password)){
                    req.session.adminId = x._id.toHexString();
                    let adminInformation = await administrationData.getAdminById((x._id).toString());
                    res.status(200).render('admin/admin', { adminInformation, partial: 'admin-script', authenticated: true });
                }
                break;
            }
        }
        res.status(401).render('admin/adminLogin', {message: "Invalid username or password", partial: 'login-script'});
    }
});

router.get('/logout', async (req, res) => {
    if (!req.session.adminId) {
        return res.redirect('/private');
    }else {
        req.session.destroy();
        return res.redirect('/private');
    }
});


module.exports = router;