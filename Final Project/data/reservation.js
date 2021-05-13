const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const reservation = mongoCollections.reservation;
const users = mongoCollections.users;
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite;
const usersCollection = require("./users");
const sitesCollection = require("./vaccineInjectionSite");
const moment = require("moment");
const vaccineCollection = require('./vaccineInjectionSite');
//reservation database
// {
//     "_id": "12eg456-e89b-24d3-a456-426655440000",
//     "userId": "12eg456-e89b-24d3-a456-426655440000",
//     "siteId": "12eg456-e89b-24d3-a456-426655440000",
//     "date": "04/06/2021",
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

async function addReservation(userId, siteId, data){

    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }

    if(!userId|| typeof (userId) !=="string"){
        throw "input a string format userId";
    }

    if(!data || typeof (data) !== "string"){
        throw "must provide birthday";
    }
    //test birthday using regular expression.
    if(!moment(data, "MM/DD/YYYY", true).isValid() &&
        !moment(data, "M/DD/YYYY", true).isValid() &&
        !moment(data, "MM/D/YYYY", true).isValid() &&
        !moment(data, "M/D/YYYY", true).isValid()){
        throw "must provide correct format data";
    }


    const reservationCollection = await reservation();
    let newReservation = {
        userId: userId,
        siteId:siteId,
        date: data,
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

    siteId = ObjectId.createFromHexString(siteId);
    let siteInformation = await vaccineCollection.getSiteById(siteId);

    let result = {
        _id: reservationCreated._id,
        userId: reservationCreated.userId,
        siteId: reservationCreated.siteId,
        data: reservationCreated.data,
        time: reservationCreated.time,
        name: siteInformation.name,
        address: siteInformation.address,
        rating: siteInformation.rating
    }


    return result;
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