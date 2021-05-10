const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const reservation = mongoCollections.reservation;
const users = mongoCollections.users;
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite;

//reservation database
// {
//     "_id": "12eg456-e89b-24d3-a456-426655440000",
//     "userId": "12eg456-e89b-24d3-a456-426655440000",
//     "siteId": "12eg456-e89b-24d3-a456-426655440000",
//     "data": "04//06/2021",
//     "time": "1617644499"
// }

async function getReservationById(reservationId){

}

async function getAllReservation(){
    const reservationCollection = await reservation();
    let allComments = await reservationCollection.find({}).toArray();
    return allComments;
}

async function addReservation(reservationId, userId, siteId){

}

async function removeReservation(reservationId, userId, siteId){

}




module.exports={
    getReservationById,
    addReservation,
    removeReservation,
    getAllReservation
}