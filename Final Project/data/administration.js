const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const administration = mongoCollections.administration;

//databases
// {
//     "_id":"12eg456-e89b-24d3-a456-426655440000",
//     "username": "admin",
//     "password": "123456",
//     "log_in_date": [{timeStamp1},{timeStamp2},{timeStamp3}]   
//
// }


async function addAdmin(username, password){
    if (!username || typeof username != 'string' || !username.trim()) throw 'invalid username'
    if (!password || typeof password != 'string' || !password.trim()) throw 'invalid password'
    var newAdmin = {
        username: username,
        password: password,
        log_in_date: []
    }
    const adminCollection = await administration();
    let insertInfo = await adminCollection.insertOne(newAdmin);
    if (!insertInfo || insertInfo === null) throw 'failed to add the admin';
    return insertInfo;

}

async function getAdminById(adminId){
    if (!adminId) throw 'adminId must be provided';
    if (typeof adminId != 'string' || !adminId.trim()) throw 'the input adminId is invalid';
    let parsedAdminId = ObjectId(adminId);
    const adminCollection = await administration();
    let adminInfo = await adminCollection.findOne({_id:parsedAdminId});
    if (!adminInfo || adminInfo === null) throw 'no admin with the provided id';
    return adminInfo;
}

async function getAllAdmin(){
    const adminCollection = await administration();
    let allAdmin = await adminCollection.find({}).toArray();
    return allAdmin;
}
 
async function removeAdminById(adminId){
    if (!adminId) throw 'adminId must be supplied';
    if (typeof adminId != 'string' || !adminId.trim()) throw 'the input adminId is invalid';
    let parsedAdminId = ObjectId(adminId);
    const adminCollection = await administration();
    let deleteInfo = adminCollection.removeOne({_id:parsedAdminId});
    if (deleteInfo.deletedCount === 0) {
        throw 'Could not delete the admin';
    }
    return deleteInfo;
}

async function updateAdminUsername(adminId, newUsername) {
    if (!adminId) throw 'adminId must be supplied';
    if (typeof adminId != 'string' || !adminId.trim()) throw 'the input adminId is invalid';   
    let parsedAdminId = ObjectId(adminId);
    const adminCollection = await administration();
    let adminInfo = await adminCollection.findOne({username: newUsername});
    if (adminInfo !== null) throw 'the username already exist!';
    let updatedAdmin = {
        username: newUsername
    }
    let adminUpdateInfo = await adminCollection.updateOne({ _id: parsedAdminId }, { $set: updatedAdmin });
        if (adminUpdateInfo.modifiedCount === 0) {
            throw 'could not update the username successfully';
        }
        return this.getAdminById(adminId);
}
async function updateAdminPassword(adminId, newPassword) {
    if (!adminId) throw 'adminId must be supplied';
    if (typeof adminId != 'string' || !adminId.trim()) throw 'the input adminId is invalid';   
    let parsedAdminId = ObjectId(adminId);
    const adminCollection = await administration();
    let updatedAdmin = {
        password: newPassword
    }
    let adminUpdateInfo = await adminCollection.updateOne({ _id: parsedAdminId }, { $set: updatedAdmin });
    if (adminUpdateInfo.modifiedCount === 0) {
        throw 'could not update the password successfully';
    }
    return this.getAdminById(adminId);
}
async function updateAdminLoginDate(adminId, newLogIn) {
    if (!adminId) throw 'adminId must be supplied';
    if (typeof adminId != 'string' || !adminId.trim()) throw 'the input adminId is invalid';   
    let parsedAdminId = ObjectId(adminId);
    const adminCollection = await administration();
    let updatedAdmin = adminCollection.FindOne({_id:parsedAdminId});
    adminUpdateInfo.log_in_date.push(new Date.now());
    let adminUpdateInfo = await adminCollection.updateOne({ _id: parsedAdminId }, { $set: updatedAdmin });
    if (adminUpdateInfo.modifiedCount === 0) {
        throw 'could not update the loginDate successfully';
    }
    return this.getAdminById(adminId);
}
module.exports = {
    addAdmin,
    getAdminById,
    getAllAdmin,
    removeAdminById,
    updateAdminUsername,
    updateAdminPassword,
    updateAdminLoginDate
}


