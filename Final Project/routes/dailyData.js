const express = require('express');
const router = express.Router();
const data = require("../data");
const dailyData = data.dailyData;




router.get('/:id', async (req, res) =>{
    try{
        const dailyDataInfo = dailyData.getCommentById(req.params.id);
        res.json(dailyDataInfo);
    }catch (e){
        res.status(404).json({error: 'Comment not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const dailyDataInfo = dailyData.getAllComments();
        res.json(dailyDataInfo);
    }catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) =>{
    let dailyDataInfo = req.body;
    if(!dailyDataInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {dailyCases, dailyDeath, dailyVaccination, dailyRecover, sum_of_cases, sum_of_death, sum_of_vaccination, sum_of_recover, change_date} = dailyDataInfo;
    if(!dailyCases){
        res.status(400).json({error: "You must input a dailyCases"});
    }
    if(!dailyDeath){
        res.status(400).json({error: "You must input a dailyDeath"});
    }
    if(!dailyVaccination){
        res.status(400).json({error: "You must input a dailyVaccination"});
    }
    if(!dailyRecover){
        res.status(400).json({error: "You must input a dailyRecover"});
    }
    if(!sum_of_cases){
        res.status(400).json({error: "You must input a sum_of_cases"});
    }
    if(!sum_of_death){
        res.status(400).json({error: "You must input a sum_of_death"});
    }
    if(!sum_of_vaccination){
        res.status(400).json({error: "You must input a sum_of_vaccination"});
    }
    if(!sum_of_recover){
        res.status(400).json({error: "You must input a sum_of_recover"});
    }
    if(!change_date){
        res.status(400).json({error: "You must input a change_date"});
    }

    try{
        const newDailyData = await dailyData().addData(dailyCases, dailyDeath, dailyVaccination, dailyRecover, sum_of_cases, sum_of_death, sum_of_vaccination, sum_of_recover, change_date);
        res.status(200).send(newDailyData);
    }catch (e){
        res.status(500).json({error:e});
    }
});

router.delete('/', async (req, res) =>{
    let dailyDataInfo = req.body;
    if(!dailyDataInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {dailyDataId} = commentInfo;

    try{
        await commentData.getCommentById(userId);
    }catch (e){
        res.status(404).json({error: "Comment not found"});
    }

    try{
        const deleteInfo = await commentData.removeComment(commentId, userId, siteId);
        res.status(200).send(deleteInfo);
    }catch (e){
        res.status(500).json({ error: e});
    }
});