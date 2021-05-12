const express = require("express");
const router = express.Router();
const data = require("../data");
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const userData = data.users;
const xss = require('xss');

router.get('/account', async (req, res) =>{
    if(!req.session.userId){
        return res.redirect('/private');
    }
    try{
        const userId = req.session.userId;
        let userInformation = await userData.getUserById(userId);
        res.render('user/login', {name: userInformation.name,
            username: userInformation.username,
            email: userInformation.email, userInformation});

    }catch (e){
        res.status(404).json({error: 'User not found'});
    }
});

router.post('/account', async (req, res) =>{
    const{name, username, password, email, address, birthday, gender, race,
        ethnicity, insurance, medicalGroupNumber, medicalid, repeatPassword} = req.body;
    if(!req.session.userId){
        return res.redirect('/private');
    }
    let oldUser;
    const userId = req.session.userId;
    try{
        oldUser = await userData.getUserById(userId);
    }catch (e){
        res.status(404).json({error: 'User not found'});
        return ;
    }

    try{
        let message1;
        let message2;
        let message3;
        if(username === oldUser.username){
            throw "you have to input different username";
        }
        if(password === oldUser.password){
            throw "you have to input different password";
        }
        if(password === repeatPassword){
            throw "Password don not match";
        }
        if(email === oldUser.email){
            throw "you have to input different email";
        }

        if(username){
            await userData.updateUsername(userId, username);
            message1 = "username has been updates";
        }
        if(password){
            const hashPassword = await bcrypt.hash(password, saltRounds);
            await userData.updatePassword(userId, hashPassword);
            message2 = "password has been updates";
        }

        await userData.updateUserInformation(userId, name, email, address, birthday,
            gender, race, ethnicity, insurance, medicalGroupNumber, medicalid);
        message3 = "information has been updates";

        let updateUser = await userData.getUserById(userId);
        res.render('users/login', {})
    }catch (e){
        //add code
    }
});


router.get('/loginin', async (req, res) =>{
    if(!req.session.userId){
        return res.redirect('/private');
    }
    else {
        res.render('/landing/landing');
    }
});

router.post('/loginin', async (req, res) =>{
    if(!req.session.userId){
        return res.redirect('/private');
    }
    else {
        let {username, password} = req.body;
        // const username = xss(req.body.username.trim());
        // const password = xss(req.body.password.trim());
        const allUser = await userData.getAllUsers();
        for(let x of allUser){
            if(username === x.username){
                if(await bcrypt.compare(password, x.password)){
                    req.session.userId = x._id.toHexString();
                    return res.redirect('/homePage');
                }
                break;
            }
        }
        res.status(401).render('/landing/landing', {message: "Invaild username or password"});
    }
});

router.get('/logup', async (req, res) =>{
    if (!req.session.userId) {
        return res.redirect('/private');
    }else {
        return res.render('landing/landing');
    }
});

//only name, username, password, email birthday and insurance are necessary, and username and email are unique.
router.post('/logup', async (req, res) =>{
    const{name, username, password, email, address, birthday, gender, race,
        ethnicity, insurance, medicalGroupNumber, medicalid, repeatPassword} = req.body;
    try{
        if(!name){
            throw "You must input a name";
        }
        if(!username){
            throw "You must input a username";
        }
        if(!password){
            throw "You must input a password";
        }
        if(!email){
            throw "You must input a email";
        }
        if(!birthday){
            throw "you must input a birthday";
        }
        if(!insurance){
            throw "you must input a insurance";
        }
        if(password === repeatPassword){
            throw "you must input a same password";
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userData.createUser(name, username, hashPassword, email, address, birthday, gender,race,
            ethnicity, insurance, medicalGroupNumber, medicalid);
        req.session.userId = newUser._id.toHexString();
        return res.redirect('/private');
    }catch (e){
        res.status(404).render('landing/landing',{message:e});
    }
});


router.get('/logout', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/private');
    }else {
        req.session.destroy();
        return res.redirect('/private');
    }
});


router.get('/all', async (req, res) =>{
    try{
        const userList = await userData.getAllUsers();
        res.json(userList);
    }catch (e){
        res.status(500).send();
    }
});

router.delete('/remove', async (req, res) =>{
    try{
        await userData.getUserById(req.params.id);
    }catch (e){
        res.status(404).json({error: "No message found"});
    }

    try{
        const removeUser = await userData().removeUserByUserId(req.params.id);
        res.status(200).send(removeUser);
    }catch (e){
        res.status(500).json({ error: e });
    }
});




module.exports = router;