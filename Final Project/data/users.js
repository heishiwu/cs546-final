const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 16;


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
//     "insuranceType":"Private Insurance",
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
async function createUser(name, username, password, email, address, birthday, gender, race, ethnicity, insurance, medicalGroupNumber, medicalid, reservation_history, comments_history){
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


};


// get user all information by userId
async function getUserById(userId){
    if (!verify.validString(userId)){
        throw 'User id is not a valid string.';
    }
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

async function updateUsername(){

};

async function updatePassword(){

};



async function updateUserInformation(){

};

async function removeUser(){

};




module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUsername,
    updatePassword,
    updateUserInformation,
    removeUser
}