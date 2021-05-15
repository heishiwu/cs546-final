const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;
const vaccineData = data.vaccineInjectionSite;
const usersData = data.users;
const { ObjectId } = require('mongodb');

/**
 * get comment information by commentId
 */
// router.get('/:id', async (req, res) =>{
//     try{
//         const commentInformation = await commentData.getCommentById(req.params.id);
//         res.json(commentInformation);
//     }catch (e){
//         res.status(404).json({error: 'Comment not found'});
//     }
// });

router.get('/:id', async (req, res) =>{
    try{
        let commentId = req.params.id;
        const commentInformation = await commentData.getCommentById(commentId.toString());
        let userId = commentInformation.userId;
        const userInformation = await usersData.getUserById(userId);
        let result = {
            _id: commentInformation._id,
            userId: commentInformation.userId,
            siteId: commentInformation.siteId,
            date: commentInformation.date,
            rating: commentInformation.rating,
            comment: commentInformation.comment,
            name: userInformation.name
        }
        res.status(200).render('sites/single', {partial: 'list-single-script', result: result});
        // res.json(result);
    }catch (e){
        res.status(404).json({error: 'Comment not found'});
    }
});

/**
 * get all comments, but is useless
 */
router.get('/', async (req, res) =>{
    try{
        const commentInformation = await commentData.getAllComments();
        res.json(commentInformation);
    }catch (e){
        res.status(500).send();
    }
});

/**
 * create a new comments, input userId, siteId, rating, comment, and it will automatically update
 * comments information in users and vaccineInjectionSite database.
 */
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
        const updateUser = await usersData.addCommentIdFromUser(userId, (newComment._id).toString());
        const updateSite = await vaccineData.addCommentIdFromSite(siteId, (newComment._id).toString());
        // res.status(200).json({commentInfo: newComment, userInfo: updateUser, updateSite: updateSite});
        res.status(200).send(newComment);
    }catch (e){
        res.status(500).json({error:e});
    }
});


/**
 * delete a comments with commentId,  and it will automatically delete
 * reservation and comments information in users and vaccineInjectionSite database.
 */
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
        const userInfo = await usersData.removeCommentIdFromUser(userId, (commentId).toString());
        const siteInfo = await vaccineData.removeCommentIdFromSite(siteId, (commentId).toString());
        const message = await commentData.removeComment(commentId, userId, siteId);
        // res.status(200).json({commentInfo: message, userInfo: userInfo, updateSite: siteInfo});
        res.status(200).send(message);
    }catch (e){
        res.status(500).json({ error: e});
    }
});

/**
 * get avgRating data in one siteId.
 */
router.get('/avgRating/:id', async (req, res) =>{
    // try{
    //     const commentInformation = await commentData.averageRating(req.params.id);
    //     res.json(commentInformation);
    // }catch (e){
    //     res.status(404).json({error: 'Site not found'});
    // }

    let siteId = req.params.id;
    let siteInformation;
    try{
        siteInformation =  await vaccineData.getSiteById(siteId);
    }catch (e){
        throw "error";
    }
    let CH = siteInformation.comments_history;
    if(!(CH) || typeof (CH) === 'undefined') {
        return res.render('sites/single', {partial: 'sites-list-script', rating: null});
        // if NULL, return null to sites/singles
    }else {
        let commentsHistory = CH;
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
        let sum1 = (sum/ temp.length).toFixed(1);
        let siteInformation = await vaccineData.updateRating(siteId.toString(), sum1.toString());
        res.status(200).json({siteInformation});
        // return res.render('sites/single',
        //     {partial: 'sites-list-script',siteInformation: siteInformation});

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