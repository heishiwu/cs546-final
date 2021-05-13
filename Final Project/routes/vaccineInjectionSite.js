const express = require('express');
const router = express.Router();
const data = require("../data");
const vaccineData = data.vaccineInjectionSite;



router.get('/AllComments/:id', async (req, res) =>{
    try{
        const commentInformation = vaccineData.getAllCommentsSiteId(req.params.id);
        res.json(commentInformation);
    }catch (e){
        res.status(404).json({error: 'Site not found'});
    }
});

module.exports = router;