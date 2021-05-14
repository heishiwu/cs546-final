const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite;
const commentsCollection = require("./comments");

//vaccineInjectionSite database
// {
//     "_id":"12eg456-e89b-24d3-a456-426655440000",
//     "name":"River Side",
//     "address":{
//         "addressLine": "1232 Grand St.",
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
//     "rating":"4.5"
// }

//this function is used in ./data/comment.js
async function removeCommentIdFromSite(siteId, commentId){
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }
    if(!commentId || typeof (commentId) !=="string"){
        throw "input a string format commentId";
    }
    // siteId = ObjectId.createFromHexString(siteId);
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
    // siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId);
    let list2 = [];
    for(let i of siteInformation.reservation_history){
        if (i !== reservationId){
            list2.push(i);
        }
    }
    siteInformation.reservation_history = list2;
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
    // siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId.toString());
    if(!siteInformation.comments_history){
        let temp = [];
        siteInformation.comments_history = temp;
        siteInformation.comments_history.push(commentId);
    }else {
        siteInformation.comments_history.push(commentId);
    }
    // siteInformation.comments_history.push(commentId);
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
    // siteId = ObjectId.createFromHexString(siteId);
    const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId.toString());
    if(!siteInformation.reservation_history){
        let temp = [];
        siteInformation.reservation_history = temp;
        siteInformation.reservation_history.push(reservationId);
    }else {
        siteInformation.reservation_history.push(reservationId);
    }
    // siteInformation.reservation_history.push(reservationId);
    let updateInformation = await siteCollection.updateOne({ _id: siteId }, { $set: { reservation_history: siteInformation.reservation_history} });
    return updateInformation;
}

async function getSiteById(siteId){
    if (!siteId|| typeof siteId !== 'string'){
        throw 'Site id is not a valid string.';
    }

    siteId = ObjectId(siteId);
    const vaccineCollection = await vaccineInjectionSite();
    let vaccine = await vaccineCollection.findOne({_id: siteId});
    if(vaccine === null){
        throw "No site found";
    }
    return vaccine;
}
async function getAllSites(){
    const vaccineCollection = await vaccineInjectionSite();
    let allSites = await vaccineCollection.find({}).toArray();
    return allSites;
}
async function updateSite(siteId, name, address, Rating){
    //name check
    if (!name || typeof name !== 'string' || !name.trim()) throw 'invalid name';
    //address check
    if (!address || typeof address !== 'object') throw 'invalid address';
    if (!address.addressLine || typeof address.addressLine !== 'string' || !address.addressLine.trim()) throw 'invalid address.addressLine';
    if (!address.apartment_suite_unitNumber || typeof address.apartment_suite_unitNumber !== 'string' || !address.apartment_suite_unitNumber.trim()) throw 'invalid apartment_suite_unitNumber';
    if (!address.city || typeof address.city !== 'string' || !address.city.trim()) throw 'invalid city';
    if (!address.county || typeof address.county !== 'string' || !address.county.trim()) throw 'invalid county';
    if (!address.state || typeof address.state !== 'string' || !address.state.trim()) throw 'invalid state';
    if (!address.postalCode || typeof address.postalCode !== 'string' || !address.postalCode.trim()) throw 'Please provide postalCode';
    //test postalCode using regular expression.
    if(!(/^[0-9]{5}?$/).test(address.postalCode)){
        throw "must provide correct format postalCode";
    }
    //reservation_history check
    // if (!reservation_history || typeof reservation_history !== 'object') throw 'invalid reservation_history';
    // //comments_history check
    // if (!comments_history || typeof comments_history !== 'object') throw 'invalid comments_history';
    //rating check
    if (!Rating || typeof Rating !== 'string' || !Rating.trim()) throw 'invalid Rating';


    let parsedSiteId = ObjectId(siteId);
    const vaccineCollection = await vaccineInjectionSite();

    let siteUpdateInfo = {
        name: name,
        address: address,
        // reservation_history: reservation_history,
        // comments_history: comments_history,
        Rating: Rating
    };
    let updatedInfo = await vaccineCollection.updateOne({ _id: parsedSiteId }, { $set: siteUpdateInfo });
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not edit the site successfully';
    }
    return this.getSiteById(siteId);
}
async function removeSite(siteId){
    if (!siteId) throw 'siteId must be provided';
    if (typeof siteId != 'string' || !siteId.trim()) throw 'the input siteId is invalid';
    let parsedSiteId = ObjectId(siteId);
    const vaccineCollection = await vaccineInjectionSite();
    let deleteInfo = vaccineCollection.removeOne({_id:parsedSiteId});
    if (deleteInfo.deletedCount === 0) {
        throw 'Could not delete the site';
    }
    return deleteInfo;
}
async function createSite(name, address, rating){
     //name check
     if (!name || typeof name !== 'string' || !name.trim()) throw 'invalid name';
     //address check
     if (!address || typeof address !== 'object') throw 'invalid address';
     if (!address.addressLine || typeof address.addressLine !== 'string' || !address.addressLine.trim()) throw 'invalid address.addressLine';
     if (!address.apartment_suite_unitNumber || typeof address.apartment_suite_unitNumber !== 'string' || !address.apartment_suite_unitNumber.trim()) throw 'invalid apartment_suite_unitNumber';
     if (!address.city || typeof address.city !== 'string' || !address.city.trim()) throw 'invalid city';
     if (!address.county || typeof address.county !== 'string' || !address.county.trim()) throw 'invalid county';
     if (!address.state || typeof address.state !== 'string' || !address.state.trim()) throw 'invalid state';
     if (!address.postalCode || typeof address.postalCode !== 'string' || !address.postalCode.trim()) throw 'Please provide postalCode';
     //test postalCode using regular expression.
     if(!(/^[0-9]{5}?$/).test(address.postalCode)){
         throw "must provide correct format postalCode";
     }
     
     //reservation_history check
     // if (!reservation_history || typeof reservation_history !== 'object') throw 'invalid reservation_history';
     // //comments_history check
     // if (!comments_history || typeof comments_history !== 'object') throw 'invalid comments_history';
     //rating check
     if (!rating || typeof rating !== 'string' || !rating.trim()) throw 'invalid rating';
 
 
     // let parsedSiteId = ObjectId(siteId);

 
     let newSite = {
         name: name,
         address: address,
         // reservation_history: reservation_history,
         // comments_history: comments_history,
         rating: rating
    };

    const vaccineCollection = await vaccineInjectionSite();

    const insertInfo = await vaccineCollection.insertOne(newSite);

    if (insertInfo.insertedCount === 0) throw 'Could not add site.';

    const newId = insertInfo.insertedId;
    const site = await this.getSiteById(newId.toString());

    return site;
    // let insertInfo = vaccineCollection.insertOne(newSite);
    // if (!insertInfo || insertInfo === null) throw 'failed to add the site';
    //
    // const newId = insertInfo.insertedId;
    // const finsite = await this.getSiteById(newId.toString());
    //
    // return finsite;
}

async function getAllCommentsSiteId(siteId){
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }

    siteId = ObjectId.createFromHexString(siteId);
    // const siteCollection = await vaccineInjectionSite();
    let siteInformation = await getSiteById(siteId);
    let commentsHistory = siteInformation.comments_history;
    let result = []
    for(let i of commentsHistory){
        let commentIds = i._id;
        commentIds = ObjectId.createFromHexString(commentIds);
        let commentInformation = commentsCollection.getCommentById(commentIds);
        result.push(commentInformation);
    }
    return result;
}

module.exports={
    getSiteById,
    getAllSites,
    updateSite,
    removeSite,
    createSite,
    removeCommentIdFromSite,
    removeReservationIdFromSite,
    addCommentIdFromSite,
    addReservationIdFromSite,
    getAllCommentsSiteId
}
