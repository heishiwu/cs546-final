const express = require('express');
const router = express.Router();
const data = require("../data");
const vaccineData = data.vaccineInjectionSite;
const commentsData = data.comments;



router.get('/:id', async (req, res) =>{
    try{
        const siteInfo = await vaccineData.getSiteById(req.params.id);
        let commentHistArr = [];
        for( let i = 0; i < siteInfo.comments_history.length; i++){
            let commentHistObj = await commentsData.getCommentById(siteInfo.comments_history[i]);
            commentHistArr.push(commentHistObj);
        }
        res.render('sites/single', {
            partial: 'list-single-script',
            siteInfo: siteInfo,
            comments: commentHistArr
        });
    }catch (e){
        res.status(404).json({error: 'Site not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const siteInfo = await vaccineData.getAllSites();
        
        res.render('sites/list', {
            partial: 'sites-list-script',
            sites: siteInfo});
    }catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) =>{
    let siteInfo = req.body;
    if(!siteInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {name, address, rating} = siteInfo;
    if(!name){
        res.status(400).json({error: "You must input a name"});
    }
    if(!address){
        res.status(400).json({error: "You must input a address"});
    }
    // if(!reservation_history){
    //     res.status(400).json({error: "You must input a reservation_history"});
    // }
    // if(!comments_history){
    //     res.status(400).json({error: "You must input a comments_history"});
    // }
    if(!rating){
        res.status(400).json({error: "You must input a rating"});
    }
    try{
        const newSite = await vaccineData.createSite(name, address, rating);
        res.status(200).send(newSite);
    }catch (e){
        res.status(500).json({error:e});
    }
});

router.post('/update', async (req, res) =>{
    const{siteId, name, address, Rating} = req.body;
    if(!req.session.siteId){
        return res.redirect('/private');
    }
    let oldSite;
    try{
        oldSite = await vaccineData.getSiteById(req.session.siteId);
    }catch (e){
        res.status(404).json({error: 'Site not found'});
        return ;
    }
    try{
        const siteInfo = await vaccineData.updateSite(req.session.siteId, name, address, Rating);
        res.status(200).send(siteInfo)
    }catch (e){
        res.status(500).json({error:e})
    }
});

router.delete('/', async (req, res) =>{
    let siteId = req.body._id;
    if(!siteId){
        res.status(400).json({error: "You must input a data"});
    }

    // try{
    //     await vaccineData.getSiteById(siteId);
    // }catch (e){
    //     res.status(404).json({error: "Site not found"});
    // }

    try{
        const deleteInfo = await vaccineData.removeSite(siteId);
        res.status(200).send(deleteInfo);
    }catch (e){
        res.status(500).json({ error: e});
    }
});

module.exports = router;
