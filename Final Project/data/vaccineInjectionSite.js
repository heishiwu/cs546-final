const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite;

//vaccineInjectionSite database
// {
//     "_id":"12eg456-e89b-24d3-a456-426655440000",
//     "name":"River Side",
//     "address":{
//     "addressLine": "1232 Grand St.",
//         "apartment_suite_unitNumber": "APT 304",
//         "city": "hoboken",
//         "county": "hudson",
//         "state": "NJ",
//         "postalCode": "07030"
// },
//     "reservation_history":[
//     "asdadasdadad",
//     "agsdgstddsss"
// ],
//     "comments_history":[
//     "ywreywopyy",
//     "mbnvjhgmgg"
// ],
//     "Rating":"4.5"
// }

//this function is used in ./data/comment.js
async function removeCommentIdFromSite(siteId, commentId){
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }
    if(!commentId || typeof (commentId) !=="string"){
        throw "input a string format commentId";
    }
    siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId);
    let list = [];
    for(let i of siteInformation.comments_history){
        if (i !== commentId){
            list.push(i);
        }
    }
    siteInformation.comments_history = list;
    let updateInformation = await siteCollection.updateOne({ _id: userId }, { $set: { comments_history: siteInformation.comments_history} });
    return updateInformation;
}

//this function is used in ./data/reservation.js
async function removeReservationIdFromSite(siteId, reservationId){
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }
    if(!reservationId || typeof (reservationId) !=="string"){
        throw "input a string format reservationId";
    }
    siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId);
    let list = [];
    for(let i of siteInformation.reservation_history){
        if (i !== reservationId){
            list.push(i);
        }
    }
    siteInformation.reservation_history = list;
    let updateInformation = await siteCollection.updateOne({ _id: userId }, { $set: { reservation_history: siteInformation.reservation_history} });
    return updateInformation;
}

//this function is used in ./data/comment.js
async function addCommentIdFromSite(siteId, commentId){
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }

    if(!commentId || typeof (commentId) !=="string"){
        throw "input a string format commentId";
    }
    siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId);
    siteInformation.comments_history.push(commentId);
    let updateInformation = await siteCollection.updateOne({ _id: siteId }, { $set: { comments_history: siteInformation.comments_history} });
    return updateInformation;
}

//this function is used in ./data/reservation.js
async function addReservationIdFromSite(siteId, reservationId){
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }

    if(!reservationId || typeof (reservationId) !=="string"){
        throw "input a string format reservationId";
    }
    siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId);
    siteInformation.reservation_history.push(reservationId);
    let updateInformation = await siteCollection.updateOne({ _id: siteId }, { $set: { reservation_history: siteInformation.reservation_history} });
    return updateInformation;
}

async function getSiteById(siteId){
    if (!siteId|| typeof siteId !== 'string' || !siteId.trim()){
        throw 'User id is not a valid string.';
    }
    siteId = ObjectId.createFromHexString(siteId);

    const vaccineCollection = await vaccineInjectionSite();
    let vaccine = await vaccineCollection.findOne({_id: siteId});
    if(vaccine === null){
        throw "No user found";
    }
    return vaccine;
}


module.exports={
    getSiteById,
    removeCommentIdFromSite,
    removeReservationIdFromSite,
    addCommentIdFromSite,
    addReservationIdFromSite
}
