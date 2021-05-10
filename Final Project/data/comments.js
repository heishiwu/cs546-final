const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const comments = mongoCollections.comments;
const users = mongoCollections.users;
const vaccineInjectionSite = mongoCollections.vaccineInjectionSite;


//comment
// {
//     "_id": "12eg456-e89b-24d3-a456-426655440000",
//     "userId": "12eg456-e89b-24d3-a456-426655440000",
//     "siteId": "12eg456-e89b-24d3-a456-426655440000",
//     "data": "04//06/2021",
//     "rating": "4.5",
//     "comment":"Nice and Social distant"
// }

async function getCommentById(commentId){
    if(!commentId || typeof (commentId) !== "string"){
        throw "input a not string foramt commentId"
    }
    const commentCollection = await comments();
    commentId = ObjectId.createFromHexString(id);
    let commentGoal = await commentCollection.findOne({ _id: commentId });
    if (commentGoal === null)
        throw 'No comment with that id';
    return commentGoal;
}

async function getAllComments(){
    const commentCollection = await comments();
    let allComments = await commentCollection.find({}).toArray();
    return allComments;
}

async function addComment(userId, siteId, rating, comment){
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }

    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }

    if(!rating|| typeof (rating) !=="string"){
        throw "input a string format rating";
    }

    if(!comment || typeof (comment) !=="string"){
        throw "input a string format comment";
    }

    const commentCollection = await comments();
    let newComment = {
        userId: userId,
        siteId:siteId,
        date: new Date().toLocaleDateString(),
        rating: rating,
        comment: comment
    }
    let insertInfo = await commentCollection.insertOne(newComment);
    if (insertInfo === null)
        throw 'Something wrong when adding the comment';
    let newCommentId = insertInfo.insertedId;
    let commentCreated = await getCommentById(newCommentId.toHexString());

    //add two methods


    return commentCreated;



}

async function removeComment(commentId, userId, siteId){
    if(!commentId || typeof (commentId) !=="string"){
        throw "input a string format commentId";
    }
    if(!userId || typeof (userId) !=="string"){
        throw "input a string format userId";
    }
    if(!siteId || typeof (siteId) !=="string"){
        throw "input a string format siteId";
    }
    //add two methods

    commentId = ObjectId.createFromHexString(commentId);
    const commentCollection = await comments();
    let deletionInfo = await commentCollection.removeOne({ _id: commentId });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete the comment`;
    }

    return true;
}







module.exports={
    getCommentById,
    addComment,
    removeComment,
    getAllComments
}