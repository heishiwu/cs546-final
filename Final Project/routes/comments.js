const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;
const vaccineData = data.vaccineInjectionSite;
const usersData = data.users;
const { ObjectId } = require('mongodb');


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
        await usersData.addCommentIdFromUser(userId, (newComment._id).toString());
        await vaccineData.addCommentIdFromSite(siteId, (newComment._id).toString());
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

    // try{
    //     await commentData.getCommentById(userId);
    // }catch (e){
    //     res.status(404).json({error: "Comment not found"});
    // }

    try{
        // await usersData.removeCommentIdFromUser(userId, (commentId).toString());
        // await vaccineData.removeReservationIdFromSite(siteId, (commentId).toString());
        const message = await commentData.removeComment(commentId, userId, siteId);
        // await usersData.removeCommentIdFromUser(userId, (commentId).toString());
        // await vaccineData.removeReservationIdFromSite(siteId, (commentId).toString());
        res.status(200).send(message);
    }catch (e){
        res.status(500).json({ error: e});
    }
});

router.get('/avgRating/:id', async (req, res) =>{
    // try{
    //     const commentInformation = await commentData.averageRating(req.params.id);
    //     res.json(commentInformation);
    // }catch (e){
    //     res.status(404).json({error: 'Site not found'});
    // }

    let siteId = req.params.id;
    const siteInformation = await vaccineData.getSiteById(siteId);
    if(!(siteInformation.comments_history) || typeof (siteInformation.comments_history) === 'undefined') {
        return res.render('sites/single', {partial: 'sites-list-script', rating: null});
        // if NULL, return null to sites/singles
    }else {
        let commentsHistory = siteInformation.comments_history;
        let temp = [];
        for(let i = 0; i <commentsHistory.length; i++){
            // let a = commentsHistory[i];
            let commentsInfo = await commentData.getCommentById(commentsHistory[i]);
            temp.push(commentsInfo);
        }
        let sum = 0.0;
        for(let j = 0; j < temp.length; j++){
            sum += parseFloat(temp[j].rating);
        }
        let sum1 = sum/ temp.length
        return res.render('sites/single',
            {partial: 'sites-list-script',rating: sum1});

        // let result = {
        //     rating: sum1
        // }
        // return result;
        // res.status(200).json({rating: sum1});
    }

});
/**
 * This is give all comments results with siteID
 */
router.get('/allComments/:id', async (req, res) =>{
    let siteId = req.params.id;
    let siteInformation = await vaccineData.getSiteById(siteId);
    if(!(siteInformation.comments_history) || typeof (siteInformation.comments_history) === 'undefined') {
        return res.render('sites/single', {partial: 'sites-list-script', result: null});
    }else {
        let commentsHistory = siteInformation.comments_history;
        let temp = [];
        for(let i = 0; i <commentsHistory.length; i++){
            // let a = commentsHistory[i];
            let commentsInfo = await commentData.getCommentById(commentsHistory[i]);
            temp.push(commentsInfo);
        }
        let results = [];
        for(let j = 0; j <temp.length; j++){
            let userId = temp[j].userId
            let usersInfo = await usersData.getUserById(userId);
            let result = {
                commentId: temp[j]._id,
                userId: temp[j].userId,
                siteId: temp[j].siteId,
                date: temp[j].date,
                rating: temp[j].rating,
                comment: temp[j].comment,
                name: usersInfo.name
            }
            results.push(result);
        }
        // res.status(200).json({result: results});
        return res.render('sites/single', {partial: 'sites-list-script', result: results});
    }
});



module.exports = router;