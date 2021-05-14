const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;
const vaccineData = data.vaccineInjectionSite;


router.get('/:id', async (req, res) =>{
    try{
        const commentInformation = await commentData.getCommentById(req.params.id);
        res.json(commentInformation);
    }catch (e){
        res.status(404).json({error: 'Comment not found'});
    }
});


router.get('/', async (req, res) =>{
    try{
        const commentInformation = await commentData.getAllComments();
        res.json(commentInformation);
    }catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) =>{
    let commentInfo = req.body;
    if(!commentInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {userId, siteId, rating, comment} = commentInfo;
    if(!userId){
        res.status(400).json({error: "You must input a userId"});
    }
    if(!siteId){
        res.status(400).json({error: "You must input a siteId"});
    }
    if(!rating || typeof (rating) !=="string"){
        res.status(400).json({error: "You must input a string rating"});
    }
    if(!comment || typeof (comment) !=="string"){
        res.status(400).json({error: "You must input a string rating"});
    }

    try{
        const newComment = await commentData.addComment(userId, siteId, rating, comment);
        res.status(200).send(newComment);
    }catch (e){
        res.status(500).json({error:e});
    }
});



router.delete('/', async (req, res) =>{
    let commentInfo = req.body;
    if(!commentInfo){
        res.status(400).json({error: "You must input a data"});
    }

    const {commentId, userId, siteId} = commentInfo;

    try{
        await commentData.getCommentById(userId);
    }catch (e){
        res.status(404).json({error: "Comment not found"});
    }

    try{
        const message = await commentData.removeComment(commentId, userId, siteId);
        res.status(200).send(message);
    }catch (e){
        res.status(500).json({ error: e});
    }
});

router.get('/avgRating/:id', async (req, res) =>{
    try{
        const commentInformation = await commentData.averageRating(req.params.id);
        res.json(commentInformation);
    }catch (e){
        res.status(404).json({error: 'Site not found'});
    }
});



module.exports = router;