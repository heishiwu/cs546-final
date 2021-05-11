const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite();

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

}

//this function is used in ./data/reservation.js
async function removeReservationIdFromSite(siteId, reservationId){

}

//this function is used in ./data/comment.js
async function addCommentIdFromSite(siteId, commentId){

}

//this function is used in ./data/reservation.js
async function addReservationIdFromSite(siteId, reservationId){

}


module.exports={
    removeCommentIdFromSite,
    removeReservationIdFromSite,
    addCommentIdFromSite,
    addReservationIdFromSite
}
