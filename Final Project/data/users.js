const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 16;
const moment = require("moment");


//create user by some information, only name, username, password, email birthday and insurance are necessary, and username and email are unique.
//example are below
// {
//     "_id":"123",
//     "name":{
//     "firstName": "Yi",
//         "lastName": "Lin"
// },
//     "username":"sadag",
//     "password":"sdagfasgasg",
//     "email":"sdasdadas@gmail.com",
//     "address":{
//         "addressLine": "1313 Grand St.",
//         "apartment_suite_unitNumber": "APT 304",
//         "city": "hoboken",
//         "county": "hudson",
//         "state": "NJ",
//         "postalCode": "07030"
// },
//     "birthday":"02/03/1998",
//     "gender":"Male",
//     "race":"Asian",
//     "ethnicity": "Not Hispanic or latino",
//     "insurance": {
//         "insuranceType":"Private Insurance",
//         "insuranceName":"HuHu"
// },
//     "medicalGroupNumber": "HDEPO National HRA",
//     "medicalid":"sdasdad-sdasd-sdsd",
//     "reservation_history":[
//     "asdadasdadad",
//     "agsdgstddsss"
// ],
//     "comments_history":[
//     "ywreywopyy",
//     "mbnvjhgmgg"
// ]
// }
/**
 *
 * @param name: Object with 2 string: firstName, lastName. necessary
 * @param username: String. necessary and unique
 * @param password: String. necessary
 * @param email:String
 * @param address: Object with 6 string: addressLine, apartment_suite_unitNumber, city, county, state, postalCode
 * @param birthday: String MM/DD/YYYY
 * @param gender: String with 5 choices: Male, Female, Transgender, Other , Prefer not to say
 * @param race: String with 7 choices: African American or Black, White, Asian, American Indian or Alaska Native, Native Hawaiian or other Pacific islander
 * @param ethnicity: String with 3 choices: Hispanic or Latino, Not Hispanic or Latino, Prefer not to say
 * @param insurance: String with 5 choices: No Health Insurance, Private Insurance(BC/BS, Aetna, etc.....), Medicare, Medicaid, CHIP
 * @param medicalGroupNumber: String
 * @param medicalid: String
 * @param reservation_history: Array with a few of reservationId
 * @param comments_history: Array with a few of commentsId
 * @returns {Promise<void>}
 */
async function createUser(name, username, password, email, address, birthday, gender, race, ethnicity, insurance, medicalGroupNumber, medicalid){
    if (!name || typeof name !== "object"|| !name.firstName || !name.lastName|| typeof (name.firstName) !=="string" || typeof(name.lastName) !== "string"){
        throw "must provide username";
    }
    if (!username || typeof (username) !== "string") {
        throw "must provide username";
    }
    if (!password || typeof (password) !== "string") {
        throw "must provide password";
    }
    if(!email || typeof (email) !== "string"){
        throw "must provide email";
    }
    //test email using regular expression.
    if((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
        throw "must provide correct format email";
    }
    if(address){
        if(!address.addressLine || typeof (address.addressLine) !=="string"){
            throw "must provide addressLine";
        }
        if(!address.apartment_suite_unitNumber || typeof (address.apartment_suite_unitNumber) !=="string"){
            throw "must provide apartment_suite_unitNumber";
        }
        if(!address.city || typeof (address.city) !=="string"){
            throw "must provide city";
        }
        if(!address.county || typeof (address.county) !=="string"){
            throw "must provide county";
        }
        if(!address.state || typeof (address.state) !=="string"){
            throw "must provide county";
        }
        if(!address.postalCode || typeof (address.postalCode) !=="string"){
            throw "must provide postalCode";
        }
        //test postalCode using regular expression.
        if((/^[0-9]{5}(?:-[0-9]{4})?$/).test(address.postalCode)){
            throw "must provide correct format postalCode";
        }
    }
    if(!birthday || typeof (birthday) !== "string"){
        throw "must provide birthday";
    }
    //test birthday using regular expression.
    if(!moment(birthday, "MM/DD/YYYY", true).isValid() &&
        !moment(birthday, "M/DD/YYYY", true).isValid() &&
        !moment(birthday, "MM/D/YYYY", true).isValid() &&
        !moment(birthday, "M/D/YYYY", true).isValid()){
        throw "must provide correct format birthday";
    }

    if(gender){
        if(typeof (gender) !== "string"){
            throw "must provide string format gender";
        }
    }

    if(race){
        if(typeof (race) !== "string"){
            throw "must provide string format race";
        }
    }

    if(ethnicity){
        if(typeof (ethnicity) !== "string"){
            throw "must provide string format ethnicity";
        }
    }

    if(!insurance || typeof (insurance) !=="object"){
        throw "must provide string format insurance";
    }else {
        if(!insurance.insuranceType || typeof (insurance.insuranceType) !== "string"){
            throw "must provide string format insurance.insuranceType";
        }
        if(!insurance.insuranceName || typeof (insurance.insuranceName) !== "string"){
            throw "must provide string format insurance.insuranceName";
        }
    }

    if(medicalGroupNumber){
        if(typeof (medicalGroupNumber) !== "string"){
            throw "must provide string format medicalGroupNumber";
        }
    }

    if(medicalid){
        if(typeof (medicalid) !== "string"){
            throw "must provide string format medicalid";
        }
    }

    //before create the users, checking the users is unique in email and username
    const allUsers = await this.getAllUsers();
    email = email.toLowerCase();
    username = username.toLowerCase();
    allUsers.forEach(user => {
        if (user.email == email) throw 'This email is already taken.';
        if (user.username == username) throw 'This username is already taken.';
    })


    //create hashed password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = {
        name: name,
        username: username,
        password: hashedPassword,
        email: email,
        address: address,
        birthday: birthday,
        gender: gender,
        race: race,
        ethnicity: ethnicity,
        insurance: insurance,
        medicalGroupNumber: medicalGroupNumber,
        medicalid: medicalid,
    };

    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);

    if (insertInfo.insertedCount === 0) throw 'Could not add user.';

    const newId = insertInfo.insertedId;
    const finuser = await this.getUserById(newId.toString());

    return finuser;

};


// get user all information by userId
async function getUserById(userId){
    if (!userId || typeof userId !== 'string' || !userId.trim()){
        throw 'User id is not a valid string.';
    }
    userId = ObjectId.createFromHexString(userId);

    const userCollection = await users();
    let user = await userCollection.findOne({_id: userId});
    if(user === null){
        throw "No user found";
    }
    return user;
};


//get all user list without parameters
async function getAllUsers(){
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
    return allUsers;
};

async function updateUsername(userId, username){
    if (!userId || typeof userId !== 'string' || !userId.trim()){
        throw 'User id is not a valid string.';
    }
    if (!username || typeof username !== "string"){
        throw 'you should input a string as the username';
    }
    let userObjId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let userInformation = await userCollection.findOne({username: username});
    if(userInformation !== null){
        throw "the username is already exisited";
    }else {
        let userUpdateInfo = {
            username: username
        };
        let updatedInfo = await userCollection.updateOne({ _id: userObjId }, { $set: userUpdateInfo });
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not edit the username successfully';
        }
        return this.getUserById(userId);

    }


};

async function updatePassword(userId, newPassword){
    if (!userId || typeof userId !== 'string' || !userId.trim()){
        throw 'User id is not a valid string.';
    }
    if (!newPassword || typeof newPassword !== "string"){
        throw 'you should input a string as the newPassword';
    }

    let userObjId = ObjectId.createFromHexString(userId);
    const userCollection = await users();

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    let userUpdateInfo = {
        password: hashedPassword
    };
    let updatedInfo = await userCollection.updateOne({ _id: userObjId }, { $set: userUpdateInfo });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not edit the username successfully';
    }
    return this.getUserById(userId);


};



async function updateUserInformation(userId, name, email, address, birthday, gender, race, ethnicity, insurance, medicalGroupNumber, medicalid){
    if (!userId || typeof userId !== 'string' || !userId.trim()){
        throw 'User id is not a valid string.';
    }
    if(name){
        if ( typeof name !== "string"){
            throw "name should be string format";
        }
    }

    if(email){
        if((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
            throw "must provide correct format email";
        }
    }

    if(address){
        if(!address.addressLine || typeof (address.addressLine) !=="string"){
            throw "must provide addressLine";
        }
        if(!address.apartment_suite_unitNumber || typeof (address.apartment_suite_unitNumber) !=="string"){
            throw "must provide apartment_suite_unitNumber";
        }
        if(!address.city || typeof (address.city) !=="string"){
            throw "must provide city";
        }
        if(!address.county || typeof (address.county) !=="string"){
            throw "must provide county";
        }
        if(!address.state || typeof (address.state) !=="string"){
            throw "must provide county";
        }
        if(!address.postalCode || typeof (address.postalCode) !=="string"){
            throw "must provide postalCode";
        }
        //test postalCode using regular expression.
        if((/^[0-9]{5}(?:-[0-9]{4})?$/).test(address.postalCode)){
            throw "must provide correct format postalCode";
        }
    }

    if(!moment(birthday, "MM/DD/YYYY", true).isValid() &&
        !moment(birthday, "M/DD/YYYY", true).isValid() &&
        !moment(birthday, "MM/D/YYYY", true).isValid() &&
        !moment(birthday, "M/D/YYYY", true).isValid()){
        throw "must provide correct format birthday";
    }

    if(gender){
        if(typeof (gender) !== "string"){
            throw "must provide string format gender";
        }
    }

    if(race){
        if(typeof (race) !== "string"){
            throw "must provide string format race";
        }
    }

    if(ethnicity){
        if(typeof (ethnicity) !== "string"){
            throw "must provide string format ethnicity";
        }
    }

    if(!insurance || typeof (insurance) !=="object"){
        throw "must provide string format insurance";
    }else {
        if(!insurance.insuranceType || typeof (insurance.insuranceType) !== "string"){
            throw "must provide string format insurance.insuranceType";
        }
        if(!insurance.insuranceName || typeof (insurance.insuranceName) !== "string"){
            throw "must provide string format insurance.insuranceName";
        }
    }

    if(medicalGroupNumber){
        if(typeof (medicalGroupNumber) !== "string"){
            throw "must provide string format medicalGroupNumber";
        }
    }

    if(medicalid){
        if(typeof (medicalid) !== "string"){
            throw "must provide string format medicalid";
        }
    }

    let userObjId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let userInformation = await userCollection.findOne({email: email});
    if(userInformation !== null){
        throw "the email is already exisited";
    }else {
        let userUpdateInfo = {
            name: name,
            email: email,
            address: address,
            birthday: birthday,
            gender: gender,
            race: race,
            ethnicity: ethnicity,
            insurance: insurance,
            medicalGroupNumber: medicalGroupNumber,
            medicalid: medicalid,
        };
        let updatedInfo = await userCollection.updateOne({ _id: userObjId }, { $set: userUpdateInfo });
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not edit the username successfully';
        }
        return this.getUserById(userId);
    }



};

async function removeUserByUserId(userId){
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }

    userId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let deletionInfo = await userCollection.removeOne({ _id: userId });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete the comment`;
    }

    return true;
}

//this function is used in ./data/comment.js
async function removeCommentIdFromUser(userId, commentId){
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }
    if(!commentId || typeof (commentId) !=="string"){
        throw "input a string format commentId";
    }
    userId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let userInformation = await getUserById(userId);
    let list = [];
    for(let i of userInformation.comments_history){
        if (i !== commentId){
            list.push(i);
        }
    }
    userInformation.comments_history = list;
    let updateInformation = await userCollection.updateOne({ _id: userId }, { $set: { comments_history: userInformation.comments_history} });
    return updateInformation;
}

//this function is used in ./data/reservation.js
async function removeReservationIdFromUser(userId, reservationId){
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }
    if(!reservationId || typeof (reservationId) !=="string"){
        throw "input a string format reservationId";
    }
    userId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let userInformation = await getUserById(userId);
    let list = [];
    for(let i of userInformation.reservation_history){
        if (i !== reservationId){
            list.push(i);
        }
    }
    userInformation.reservation_history = list;
    let updateInformation = await userCollection.updateOne({ _id: userId }, { $set: { reservation_history: userInformation.reservation_history} });
    return updateInformation;
}

//this function is used in ./data/comment.js
async function addCommentIdFromUser(userId, commentId){
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }
    if(!commentId || typeof (commentId) !=="string"){
        throw "input a string format commentId";
    }
    userId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let userInformation = await getUserById(userId);
    userInformation.comments_history.push(commentId);
    let updateInformation = await userCollection.updateOne({ _id: userId }, { $set: { comments_history: userInformation.comments_history} });
    return updateInformation;
}

//this function is used in ./data/reservation.js
async function addReservationIdFromUser(userId, reservationId){
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }
    if(!reservationId || typeof (reservationId) !=="string"){
        throw "input a string format reservationId";
    }
    userId = ObjectId.createFromHexString(userId);
    const userCollection = await users();
    let userInformation = await getUserById(userId);
    userInformation.reservation_history.push(reservationId);
    let updateInformation = await userCollection.updateOne({ _id: userId }, { $set: { reservation_history: userInformation.reservation_history} });
    return updateInformation;
}







module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUsername,
    updatePassword,
    updateUserInformation,
    removeUserByUserId,
    removeCommentIdFromUser,
    removeReservationIdFromUser,
    addCommentIdFromUser,
    addReservationIdFromUser
}