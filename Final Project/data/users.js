const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
ObjectId = require('mongodb').ObjectID;

async function createUser(){

};

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



async function getAllUsers(){

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