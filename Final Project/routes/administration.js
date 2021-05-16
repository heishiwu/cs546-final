const express = require('express');
const router = express.Router();
const data = require("../data");
const administrationData = data.administration;
const siteData = data.vaccineInjectionSite;
const dailyData = data.dailyData;
const bcrypt = require('bcrypt');
const saltRounds = 16;
const xss = require('xss');

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
        const newAdmin = await administrationData.addAdmin(xss(username), xss(password));
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
        const newAdmin = await administrationData.updateAdminUsername(xss(adminId),xss(username));
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
                if(await bcrypt.compare(password, x.password)){
                    req.session.adminId = x._id.toHexString();
                    //let userInformation = await administrationData.getAdminById((x._id).toString());
                    res.redirect('/administration/getInfo');
                    //res.status(200).render('admin/admin', { userInformation, partial: 'admin-script', authenticated: true });
                }
                break;
            }
        }
        res.status(401).render('admin/adminLogin', {message: "Invalid username or password", partial: 'login-script'});
    }
});

router.get('/getInfo', async (req, res) =>{
    if(!req.session.adminId){
        res.redirect('../administration/login')
    } else {
            let userInformation = await administrationData.getAdminById(req.session.adminId);
            let dailyDataInfo = await dailyData.getAllData();
            let siteInfo = await siteData.getAllSites();
            res.status(200).render('admin/admin', { userInformation, dailyDataInfo, siteInfo, partial: 'admin-script', admin: true });
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

router.get('/admin/addNewSite', async (req, res) => {
    if(req.session.adminId){
        let userInformation = await administrationData.getAdminById(req.session.adminId);
        res.render('admin/addNewSite', {userInformation, partial:"addNewSite-script", admin: true});
    }
    else {
        res.render('admin/adminLogin', {
            title: 'admin Login',
            partial: 'login-script'
        });
    }
});

router.get('/admin/addDailyData', async (req, res) => {
    if(req.session.adminId){
        let userInformation = await administrationData.getAdminById(req.session.adminId);
        res.render('admin/addDailyData', {userInformation, partial:"addDailyData-script", admin: true});
    }
    else {
        res.render('admin/adminLogin', {
            title: 'admin Login',
            partial: 'login-script'
        });
    }

});

module.exports = router;