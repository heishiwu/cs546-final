const express = require('express');
const router = express.Router();
const data = require("../data");
const dailyData = data.dailyData;
const xss = require('xss');



router.get('/:id', async (req, res) =>{
    try{
        const dailyDataInfo = await dailyData.getDataById(req.params.id);
        res.json(dailyDataInfo);
    }catch (e){
        res.status(404).json({error: 'data not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const dailyDataInfo = await dailyData.getAllData();
        // res.json(dailyDataInfo);
        res.status(200).send(dailyDataInfo)
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
        const newDailyData = await dailyData.addData(xss(dailyCases), xss(dailyDeath), xss(dailyVaccination), xss(dailyRecover), xss(sum_of_cases), xss(sum_of_death), xss(sum_of_vaccination), xss(sum_of_recover), xss(change_date));
        // res.status(200).send(newDailyData);
        res.redirect('/administration/getInfo');
    }catch (e){
        res.status(500).json({error:e});
    }
});

router.delete('/', async (req, res) =>{
    let dailyDataId = req.body._id;
    if(!dailyDataId){
        res.status(400).json({error: "You must input a data"});
    }

    // try{
    //     await commentData.getDataById(dailyDataId);
    // }catch (e){
    //     res.status(404).json({error: "Daily data not found"});
    // }

    try{
        const deleteInfo = await dailyData.removeDataById(dailyDataId);
        res.status(200).send(deleteInfo);
    }catch (e){
        res.status(500).json({ error: e});
    }
});

module.exports = router;