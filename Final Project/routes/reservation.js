const express = require('express');
const router = express.Router();
const data = require("../data");
const reservationData = data.reservation;

router.get('/:id', async (req, res) =>{
    try{
        const reservationInformation =  await reservationData.getReservationById(req.params.id);
        res.json(reservationInformation);
    }catch (e){
        res.status(404).json({error: 'Comment not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const reservationInformation = await reservationData.getAllReservation();
        res.json(reservationInformation);
    }catch (e){
        res.status(500).send();
    }
});

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
        res.status(200).send(newReservation);
    }catch (e){
        res.status(500).json({error:e});
    }
});



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
        const deleteInfo = await reservationData.removeReservation(reservationId, userId, siteId);
        res.status(200).send(deleteInfo);
    }catch (e){
        res.status(500).json({ error: e});
    }
});




module.exports = router;