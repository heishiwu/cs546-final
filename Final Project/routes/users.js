const express = require("express");
const router = express.Router();
const data = require("../data");
const bcrypt = require('bcryptjs');
const saltRounds = 5;
const userData = data.users;
const xss = require('xss');


router.get('/account', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/private');
    }
    try {
        const userId = req.session.userId;
        let userInformation = await userData.getUserById(userId);

        //transfer mm/dd/yyyy into yyyy-mm-dd
        let arr = userInformation.birthday.split("/");
        userInformation.birthday = arr[2] + "-" + arr[0] + "-" + arr[1];

        res.render('users/profile', { userInformation, partial: 'profile-script', authenticated: true });

    } catch (e) {
        res.status(404).json({ error: 'User not found' });
    }
});

/**
 * update username
 */
router.post('/account1', async (req, res) => {
    const { username } = req.body;
    if (!req.session.userId) {
        return res.redirect('/private');
    }
    let oldUser;
    const userId = req.session.userId;
    try {
        oldUser = await userData.getUserById(userId);
    } catch (e) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    if (username === oldUser.username) {
        res.status(400).json({ error: 'ou have to input different username' });
        return;
    }

    try {
        const userInfo = await userData.updateUsername(xss(userId), xss(username));
        res.status(200).send(userInfo)
        // res.render("/users/login");
    } catch (e) {
        res.status(500).json({ error: e })
    }

});

/**
 * update password
 */
router.post('/account2', async (req, res) => {
    const { password, repeatPassword } = req.body;
    if (!req.session.userId) {
        return res.redirect('/private');
    }
    let oldUser;
    const userId = req.session.userId;
    try {
        oldUser = await userData.getUserById(userId);
    } catch (e) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    if (password === oldUser.password) {
        res.status(400).json({ error: 'you have to input different password' });
        return;
    }
    if (password === repeatPassword) {
        res.status(400).json({ error: 'Password don not match' });
        return;
    }

    try {
        // const hashPassword = await bcrypt.hash(password, saltRounds);
        const userInfo = await userData.updatePassword(xss(userId), xss(password));
        res.status(200).send(userInfo)
    } catch (e) {
        res.status(500).json({ error: e })
    }
});

/**
 * update userinformation except username and password
 */
router.post('/account3', async (req, res) => {

    const { firstName, lastName, email, addressLine, apartment_suite_unitNumber,
        city, county, state, postalCode, birthday, gender, race,
        ethnicity, insuranceType, insuranceName, medicalGroupNumber, medicalid } = req.body;

    let name = { firstName: firstName, lastName: lastName };
    let address = {
        addressLine: addressLine,
        apartment_suite_unitNumber: apartment_suite_unitNumber,
        city: city,
        county: county,
        state: state,
        postalCode: postalCode
    };

    let insurance = {
        insuranceType: insuranceType,
        insuranceName: insuranceName
    };

    let arr = birthday.split("-");
    let birthdayFormat = arr[1] + "/" + arr[2] + "/" + arr[0];


    // const{name, email, address, birthday, gender, race,
    //     ethnicity, insurance, medicalGroupNumber, medicalid} = req.body;
    if (!req.session.userId) {
        return res.redirect('/private');
    }
    let oldUser;
    const userId = req.session.userId;
    try {
        oldUser = await userData.getUserById(userId);
    } catch (e) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    // if (email === oldUser.email) {
    //     res.status(400).json({ error: 'you have to input different email' });
    //     return;
    // }

    try {
        const userInfo = await userData.updateUserInformation(userId, name, email, address, birthdayFormat, gender, race,
            ethnicity, insurance, medicalGroupNumber, medicalid);
        res.status(200).send(userInfo)
    } catch (e) {
        res.status(500).json({ error: e })
    }
});
//
// router.post('/account', async (req, res) =>{
//     const{name, username, password, email, address, birthday, gender, race,
//         ethnicity, insurance, medicalGroupNumber, medicalid, repeatPassword} = req.body;
//     if(!req.session.userId){
//         return res.redirect('/private');
//     }
//     let oldUser;
//     const userId = req.session.userId;
//     try{
//         oldUser = await userData.getUserById(userId);
//     }catch (e){
//         res.status(404).json({error: 'User not found'});
//         return ;
//     }
//
//     try{
//         let message1;
//         let message2;
//         let message3;
//         if(username === oldUser.username){
//             throw "you have to input different username";
//         }
//         if(password === oldUser.password){
//             throw "you have to input different password";
//         }
//         if(password === repeatPassword){
//             throw "Password don not match";
//         }
//         if(email === oldUser.email){
//             throw "you have to input different email";
//         }
//
//         if(username){
//             await userData.updateUsername(userId, username);
//             message1 = "username has been updates";
//         }
//         if(password){
//             const hashPassword = await bcrypt.hash(password, saltRounds);
//             await userData.updatePassword(userId, hashPassword);
//             message2 = "password has been updates";
//         }
//
//         await userData.updateUserInformation(userId, name, email, address, birthday,
//             gender, race, ethnicity, insurance, medicalGroupNumber, medicalid);
//         message3 = "information has been updates";
//
//         let updateUser = await userData.getUserById(userId);
//         res.render('users/login', {})
//     }catch (e){
//         //add code
//     }
// });


router.get('/login', async (req, res) => {
    if (req.session.userId) {
        let userInformation = await userData.getUserById((req.session.userId).toString());
        res.status(200).render('landing/landing', { userInformation, partial: 'login-script', authenticated: true });
    }
    else {
        res.render('users/login', {
            title: 'User Login',
            partial: 'login-script',
            unauthenticated: true
        });
    }
});

/**
 * log in users with username and password
 */
router.post('/login', async (req, res) => {
    if (req.session.userId) {
        let userInformation = await userData.getUserById((req.session.userId).toString());
        res.status(200).render('landing/landing', { userInformation, partial: 'login-script', authenticated: true });
    }
    else {
        let { username, password } = req.body;
        // const username = xss(req.body.username.trim());
        // const password = xss(req.body.password.trim());
        const allUser = await userData.getAllUsers();
        for (let x of allUser) {
            if (username === x.username) {
                if (await bcrypt.compare(password, x.password)) {
                    req.session.userId = x._id.toHexString();
                    // return res.redirect('/private');
                    let userInformation = await userData.getUserById((x._id).toString());
                    return res.status(200).render('landing/landing', { userInformation, partial: 'landing-script', authenticated: true });
                    // res.status(200).json({result: userInformation});
                }
                break;
            }
        }
        res.status(401).render('users/login', { message: "Invaild username or password", partial: 'login-script', unauthenticated: true });
    }
});

router.get('/signup', async (req, res) => {
    if (req.session.userId) {
        let userInformation = await userData.getUserById((req.session.userId).toString());
        res.status(200).render('landing/landing', { userInformation, partial: 'login-script', authenticated: true });
    } else {
        return res.render('users/signup', { partial: 'signup-script' });
    }
});

/**
 * signup username with name, username, password, email, address, birthday, gender, race,
 ethnicity, insurance, medicalGroupNumber, medicalid, repeatPassword
 */

//only name, username, password, email birthday and insurance are necessary, and username and email are unique.
router.post('/signup', async (req, res) => {
    if (req.session.userId) {
        let userInformation = await userData.getUserById((req.session.userId).toString());
        res.status(200).render('landing/landing', { userInformation, partial: 'login-script', authenticated: true });
    } {
        let userInfo = req.body;
        if (!userInfo) {
            res.status(400).json({ error: 'You must provide data to create a userInfo' });
            return;
        }
        const { firstName, lastName, username, password, email, addressLine,
            apartment_suite_unitNumber, city, county, state, postalCode, birthday,
            gender, race, ethnicity, insuranceType, insuranceName,
            medicalGroupNumber, medicalid, repeatPassword } = userInfo;
        let name = { firstName: firstName, lastName: lastName };
        let address = {
            addressLine: addressLine,
            apartment_suite_unitNumber: apartment_suite_unitNumber,
            city: city,
            county: county,
            state: state,
            postalCode: postalCode
        };
        let insurance = { insuranceType: insuranceType, insuranceName: insuranceName };

        let arr = birthday.split("-");
        let birthdayFormat = arr[1] + "/" + arr[2] + "/" + arr[0];
        // const{name, username, password, email, address, birthday, gender, race,
        //     ethnicity, insurance, medicalGroupNumber, medicalid, repeatPassword} = userInfo;
        try {
            if (!name) {
                throw "You must input a name";
            }
            if (!username) {
                throw "You must input a username";
            }
            if (!password) {
                throw "You must input a password";
            }
            if (!email) {
                throw "You must input a email";
            }
            if (!birthday) {
                throw "you must input a birthday";
            }
            if (!insurance) {
                throw "you must input a insurance";
            }
            if (password !== repeatPassword) {
                throw "you must input a same password";
            }

            // const hashPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await userData.createUser(name, username, password, email, address, birthdayFormat, gender, race,
                ethnicity, insurance, medicalGroupNumber, medicalid);
            req.session.userId = newUser._id.toHexString();
            let userInformation = await userData.getUserById((newUser._id).toString());
            // return userInformation;
            // res.status(200).json({result: userInformation});
            res.redirect('/private')
        } catch (e) {
            res.status(404).render('users/signup', { message: e, partial: 'signup-script' });
        }
    }


});

/**
 * logout users
 */
router.get('/logout', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/private');
    } else {
        req.session.destroy();
        return res.redirect('/private');
    }
});


router.get('/all', async (req, res) => {
    try {
        const userList = await userData.getAllUsers();
        res.json(userList);
    } catch (e) {
        res.status(500).send();
    }
});

/**
 * remove users by usersId
 */
router.delete('/remove', async (req, res) => {
    try {
        await userData.getUserById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: "No message found" });
    }

    try {
        const removeUser = await userData.removeUserByUserId(req.params.id);
        res.status(200).send(removeUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});




module.exports = router;