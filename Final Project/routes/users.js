const express = require("express");
const router = express.Router();
const data = require("../data");
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const userData = data.users;


router.get('/account', async (req, res) =>{

});

router.post('/account', async (req, res) =>{

});

router.get('/loginin', async (req, res) =>{

});

router.post('/loginin', async (req, res) =>{

});

router.get('/logup', async (req, res) =>{

});

router.post('/logup', async (req, res) =>{

});

router.get('/all', async (req, res) =>{
    // try{
    //     const userList = await userData.getAllUsers();
    //
    // }
});




module.exports = router;