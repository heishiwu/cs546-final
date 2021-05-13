const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const reservation = mongoCollections.reservation;
const users = mongoCollections.users;
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite;
const usersCollection = require("./users");
const sitesCollection = require("./vaccineInjectionSite");

//reservation database
// {
//     "_id": "12eg456-e89b-24d3-a456-426655440000",
//     "userId": "12eg456-e89b-24d3-a456-426655440000",
//     "siteId": "12eg456-e89b-24d3-a456-426655440000",
//     "data": "04/06/2021",
//     "time": "1617644499"
// }

async function getReservationById(reservationId){
    if(!reservationId || typeof (reservationId) !== "string"){
        throw "input a not string format reservationId"
    }
    const reservationCollection = await reservation();
    reservationId = ObjectId.createFromHexString(reservationId);
    let reservationGoal = await reservationCollection.findOne({ _id: reservationId });
    if (reservationGoal === null)
        throw 'No comment with that id';
    return reservationGoal;
}

async function getAllReservation(){
    const reservationCollection = await reservation();
    let allComments = await reservationCollection.find({}).toArray();
    return allComments;
}

async function addReservation(userId, siteId){

    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }

    if(!userId|| typeof (userId) !=="string"){
        throw "input a string format userId";
    }


    const reservationCollection = await reservation();
    let newReservation = {
        userId: userId,
        siteId:siteId,
        date: new Date().toLocaleDateString(),
        time: new Date().getTime()  // timestamp
    }
    let insertInfo = await reservationCollection.insertOne(newReservation);
    if (insertInfo === null)
        throw 'Something wrong when adding the reservation';
    let newReservationId = insertInfo.insertedId;
    let reservationCreated = await getCommentById(newReservationId.toHexString());

    //add two methods
    await usersCollection.addReservationIdFromUser(userId, newReservationId);
    await sitesCollection.addReservationIdFromSite(siteId, newReservationId);


    return reservationCreated;
}

async function removeReservation(reservationId, userId, siteId){
    if(!reservationId || typeof (reservationId) !=="string"){
        throw "input a string format reservationId";
    }

    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }

    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }
    //add two methods
    await usersCollection.removeReservationIdFromUser(userId, reservationId);
    await sitesCollection.removeReservationIdFromSite(siteId, reservationId);

    reservationId = ObjectId.createFromHexString(reservationId);
    const reservationCollection = await reservation();
    let deletionInfo = await reservationCollection.removeOne({ _id: reservationId });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete the comment`;
    }

    return true;
}




module.exports={
    getReservationById,
    addReservation,
    removeReservation,
    getAllReservation
}