const express = require('express');
const router = express.Router();
const data = require("../data");
const reservationData = data.reservation;
const usersData = data.users;
const vaccineData = data.vaccineInjectionSite;
const xss = require('xss');
/**
 * get reservation information by reservationId
 */
// router.get('/:id', async (req, res) =>{
//     try{
//         const reservationInformation =  await reservationData.getReservationById(req.params.id);
//         res.json(reservationInformation);
//     }catch (e){
//         res.status(404).json({error: 'Comment not found'});
//     }
// });


router.get('/:id', async (req, res) =>{
    // if(!req.session.user){
    //     req.session.previousRoute = req.originalUrl;
    //     res.redirect('/users/login');
    //     return;
    // }
        let siteId = req.params.id;
    try{
    //     let reservationId = req.params.id
    //     const reservationInformation =  await reservationData.getReservationById(reservationId.toString());
    //     let siteId = reservationInformation.siteId;
    //     const siteInformation = await vaccineData.getSiteById(siteId);
    //     let result = {
    //         _id: reservationInformation._id,
    //         userId: reservationInformation.userId,
    //         siteId: reservationInformation.siteId,
    //         date: reservationInformation.date,
    //         time: reservationInformation.time,
    //         sitename: siteInformation.name
    //     };
        // res.json(result);
        res.status(200).render('reservation/makeReservation', {siteId, partial: 'makeReservation-script'});

    }catch (e){
        res.status(404).json({error: 'Reservation not found'});
    }
});



/**
 * get all reservations, but is useless
 */
router.get('/', async (req, res) =>{
    try{
        const reservationInformation = await reservationData.getAllReservation();
        res.json(reservationInformation);
    }catch (e){
        res.status(500).send();
    }
});

/**
 * create a new reservations, input userId, siteId, data, and it will automatically update
 * reservation information in users and vaccineInjectionSite database.
 */
router.post('/:id', async (req, res) =>{
    let reservationInfo = req.body;
    if(!reservationInfo){
        res.status(400).json({error: "You must input a data"});
    }
    if(!req.session) {
        return res.redirect('../private')
    } else {
        const userId = req.session.userId;
        const siteId = req.params.id;
        const date = reservationInfo.reservationDate;
        if(!userId){
            res.status(400).json({error: "You must input a userId"});
        }
        if(!siteId){
            res.status(400).json({error: "You must input a siteId"});
        }
        if(!data){
            res.status(400).json({error: "You must input a data"});
        }
    
        try{
            const newReservation = await reservationData.addReservation(userId, siteId, date);
            const userInfo = await usersData.addReservationIdFromUser(userId, (newReservation._id).toString());
            const siteInfo = await vaccineData.addReservationIdFromSite(siteId, (newReservation._id).toString());
            return res.redirect('/reservation/allReservation/' + userId);
            //res.status(200).render('reservation/myReservation', {result: newReservation, partial: 'myReservation-script'});
            // res.status(200).json({newReservation: newReservation, userInfo: userInfo, siteInfo: siteInfo});
        }catch (e){
            res.status(500).json({error:e});
        }
    }

});


// /**
//  * create a new reservations, input userId, siteId, data, and it will automatically update
//  * reservation information in users and vaccineInjectionSite database.
//  */
// router.post('/:id', async (req, res) =>{
//
//     // let reservationInfo = req.body;
//     // if(!reservationInfo){
//     //     res.status(400).json({error: "You must input a data"});
//     // }
//     // const {userId, siteId, data} = reservationInfo;
//     let userId = req.session.userId;
//     userId = userId.toString();
//     let siteId = req.params.id;
//     siteId = siteId.toString();
//     let data = req.body.data;
//
//     if(!userId){
//         res.status(400).json({error: "You must input a userId"});
//     }
//     if(!siteId){
//         res.status(400).json({error: "You must input a siteId"});
//     }
//     if(!data){
//         res.status(400).json({error: "You must input a data"});
//     }
//
//     try{
//         const newReservation = await reservationData.addReservation(userId, siteId, data);
//         const userInfo = await usersData.addReservationIdFromUser(userId, (newReservation._id).toString());
//         const siteInfo = await vaccineData.addReservationIdFromSite(siteId, (newReservation._id).toString());
//         res.status(200).render('reservation/myReservation', {newReservation});
//         // res.status(200).json({newReservation: newReservation, userInfo: userInfo, siteInfo: siteInfo});
//     }catch (e){
//         res.status(500).json({error:e});
//     }
// });


/**
 * delete a reservation with reservationId,  and it will automatically delete
 * reservation information in users and vaccineInjectionSite database.
 */
router.delete('/', async (req, res) =>{
    let reservationInfo = req.body;
    if(!reservationInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {reservationId, userId, siteId} = reservationInfo;

    try{
        await reservationData.getReservationById(reservationId);
    }catch (e){
        res.status(404).json({error: "Reservation not found"});
    }

    try{
        const userInfo = await usersData.removeReservationIdFromUser(xss(userId),(reservationId).toString());
        const siteInfo = await vaccineData.removeReservationIdFromSite(xss(siteId), (reservationId).toString());
        const message = await reservationData.removeReservation(xss(reservationId), userId, siteId);
        // res.status(200).json({commentInfo: message, userInfo: userInfo, updateSite: siteInfo});
        res.status(200).send(message);
    }catch (e){
        res.status(500).json({ error: e});
    }
});
/**
 *  This is give all reservation results with one userId
 */
router.get('/allReservation/:id', async (req, res) =>{
    
    let userId = req.params.id;
    let userInformation = await usersData.getUserById(userId);
    if(!(userInformation.reservation_history) || typeof (userInformation.reservation_history) === 'undefined') {
        return res.render('reservation/myReservation', {partial: 'myReservation-script', result: null});
    }else {
        let reservationHistory = userInformation.reservation_history;
        let temp = [];
        for(let i = 0; i <reservationHistory.length; i++){
            let ReservationInfo = await reservationData.getReservationById(reservationHistory[i]);
            temp.push(ReservationInfo);
        }
        let results = [];
        for(let j = 0; j <temp.length; j++){
            let siteId = temp[j].siteId;
            let siteInfo = await vaccineData.getSiteById(siteId);
            let result = {
                reservationId: temp[j]._id,
                userId: temp[j].userId,
                siteId: temp[j].siteId,
                date: temp[j].date,
                time:new Date(parseInt(temp[j].time)).toLocaleDateString(),
                siteName: siteInfo.name,
                siteAddress: siteInfo.address,
                siteRating: siteInfo.rating
            }
            results.push(result);
        }
        // res.status(200).json({result: results});
        return res.render('reservation/myReservation', {partial: 'myReservation-script', result: results});
        // res.status(200).json({result: results});
    }
});



// function formatDate(date) {
//     let dates = date.split("/");
//     if(dates.length == 3) {
//         if(dates[1].length == 1) {
//             dates[1] = "0" + dates[1];
//         }
//         if (dates[2].length == 1) {
//             dates[2] = "0" + dates[2];
//         }
//         date = dates.join("-");
//         return date;
//     } else {
//         return null;
//     }
// }



module.exports = router;