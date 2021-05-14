const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get('/', async (req, res) =>{
    try{
        let userInformation;
        if(req.session){
            if(req.session.userId){
                userInformation = await userData.getUserById(req.params.userId);
            }
        }
        res.render('landing/landing', {userInformation,partial:'landing-script'});
    }catch (e){
        res.redirect('/private');
    }
});


// router.get('/search', async (req, res) =>{
//
// });
//
// router.post('/search', async (req, res) => {
//
// });

module.exports = router;