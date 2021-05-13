const express = require('express');
const router = express.Router();
const data = require("../data");
const vaccineData = data.vaccineInjectionSite;



router.get('/:id', async (req, res) =>{
    try{
        const siteInfo = vaccineData.getSiteById(req.params.id);
        res.json(siteInfo);
    }catch (e){
        res.status(404).json({error: 'Site not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const siteInfo = vaccineData.getAllSites();
        res.json(siteInfo);
    }catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) =>{
    let siteInfo = req.body;
    if(!siteInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {name, address, reservation_history, comments_history, rating} = siteInfo;
    if(!name){
        res.status(400).json({error: "You must input a name"});
    }
    if(!address){
        res.status(400).json({error: "You must input a address"});
    }
    if(!reservation_history){
        res.status(400).json({error: "You must input a reservation_history"});
    }
    if(!comments_history){
        res.status(400).json({error: "You must input a comments_history"});
    }
    if(!rating){
        res.status(400).json({error: "You must input a rating"});
    }
    try{
        const newSite = await vaccineData().createSite(dailyCases, dailyDeath, dailyVaccination, dailyRecover, sum_of_cases, sum_of_death, sum_of_vaccination, sum_of_recover, change_date);
        res.status(200).send(newSite);
    }catch (e){
        res.status(500).json({error:e});
    }
});

router.post('/update', async (req, res) =>{
    const{siteId, name, address, reservation_history, comments_history, Rating} = req.body;
    if(!req.session.siteId){
        return res.redirect('/private');
    }
    let oldSite;
    const siteId = req.session.siteId;
    try{
        oldSite = await vaccineData.getSiteById(siteId);
    }catch (e){
        res.status(404).json({error: 'Site not found'});
        return ;
    }
    try{
        const siteInfo = await vaccineData.updateSite(siteId, name, address, reservation_history, comments_history, Rating);
        res.status(200).send(siteInfo)
    }catch (e){
        res.status(500).json({error:e})
    }
});

router.delete('/', async (req, res) =>{
    let siteId = req.body;
    if(!siteId){
        res.status(400).json({error: "You must input a data"});
    }

    try{
        await vaccineData.getSiteById(siteId);
    }catch (e){
        res.status(404).json({error: "Site not found"});
    }

    try{
        const deleteInfo = await vaccineData.removeSite(siteId);
        res.status(200).send(deleteInfo);
    }catch (e){
        res.status(500).json({ error: e});
    }
});

module.exports = router;
