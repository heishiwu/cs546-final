const express = require('express');
const router = express.Router();
const data = require("../data");
const reservationData = data.reservation;
const usersData = data.users;
const vaccineData = data.vaccineInjectionSite;

/**
 * get reservation information by reservationId
 */
router.get('/:id', async (req, res) =>{
    try{
        const reservationInformation =  await reservationData.getReservationById(req.params.id);
        res.json(reservationInformation);
    }catch (e){
        res.status(404).json({error: 'Comment not found'});
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
router.post('/', async (req, res) =>{
    let reservationInfo = req.body;
    if(!reservationInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {userId, siteId, data} = reservationInfo;
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
        const newReservation = await reservationData.addReservation(userId, siteId, data);
        await usersData.addReservationIdFromUser(userId, (newReservation._id).toString());
        await vaccineData.addReservationIdFromSite(siteId, (newReservation._id).toString());
        res.status(200).send(newReservation);
    }catch (e){
        res.status(500).json({error:e});
    }
});


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
        await usersData.removeReservationIdFromUser(userId,(reservationId).toString());
        await vaccineData.removeReservationIdFromSite(siteId, (reservationId).toString());
        const message = await reservationData.removeReservation(reservationId, userId, siteId);
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
        return res.render('users/profile', {partial: 'makeReservation-script', result: null});
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
                time: temp[j].time,
                siteName: siteInfo.name,
                siteAddress: siteInfo.address,
                siteRating: siteInfo.rating
            }
            results.push(result);
        }
        // res.status(200).json({result: results});
        return res.render('users/profile', {partial: 'makeReservation-script', result: results});
        // res.status(200).json({result: results});
    }
});




module.exports = router;