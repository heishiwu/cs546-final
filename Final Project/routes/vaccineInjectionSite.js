const express = require('express');
const router = express.Router();
const data = require("../data");
const vaccineData = data.vaccineInjectionSite;
const commentsData = data.comments;
const userData = data.users;
const adminData = data.administration;



router.get('/:id', async (req, res) =>{
    
    try{
//////////////
        let siteId = req.params.id;
        let siteInformation =  await vaccineData.getSiteById(siteId);
        // try{
        //     siteInformation =  await vaccineData.getSiteById(siteId);
        // }catch (e){
        //     throw "error";
        // }
        
        let CH = siteInformation.comments_history;
        if(!(CH) || typeof (CH) === 'undefined') {
            return res.render('sites/single', {partial: 'sites-list-script', rating: null});
            // if NULL, return null to sites/singles
        }else {
            
            let commentsHistory = CH;
            let temp = [];
            for(let i = 0; i <commentsHistory.length; i++){
                // let a = commentsHistory[i];
                let commentsInfo = await commentsData.getCommentById(commentsHistory[i]);
                
                temp.push(commentsInfo);
            }
            
            let sum = 0.0;
            for(let j = 0; j < temp.length; j++){
                sum += parseFloat(temp[j].rating);
            }
            let sum1 = (sum/ temp.length).toFixed(1);
            let siteInformation = await vaccineData.updateRating(siteId.toString(), sum1.toString());
            // return res.render('sites/single',
            //     {partial: 'sites-list-script',siteInformation: siteInformation});

            // let result = {
            //     rating: sum1
            // }
            // return result;
            // res.status(200).json({rating: sum1});
        }


////////////////
        const siteInfo = await vaccineData.getSiteById(req.params.id);
        
        let commentHistArr = [];
        for( let i = 0; i < siteInfo.comments_history.length; i++){
            let commentHistObj = await commentsData.getCommentById(siteInfo.comments_history[i]);
            let userObj = await userData.getUserById(commentHistObj.userId);
            let userName = userObj.name;
            commentHistObj['name'] = userName;
            commentHistArr.push(commentHistObj);
        }

        if (req.session.userId){
            let userInformation = await userData.getUserById((req.session.userId).toString());
            res.render('sites/single', {
                userInformation,
                partial: 'list-single-script',
                siteInfo: siteInfo,
                comments: commentHistArr,
                authenticated : true
            });
        }else if(req.session.adminId){
            let userInformation = await adminData.getAdminById((req.session.adminId).toString());
            
            res.render('sites/single', {
                userInformation,
                partial: 'list-single-script',
                siteInfo: siteInfo,
                comments: commentHistArr,
                authenticated : true
            });
        }else {
            res.render('sites/single', {
                partial: 'list-single-script',
                siteInfo: siteInfo,
                comments: commentHistArr
            });
        }

    }catch (e){
        res.status(404).json({error: e});
    }
});


router.get('/', async (req, res) =>{
    try{
        const siteInfo = await vaccineData.getAllSites();
        if (req.session.adminId){
            let userInformation = await adminData.getUserById((req.session.admin).toString());
            res.render('sites/list', {
                userInformation,
                partial: 'sites-list-script',
                sites: siteInfo,
                authenticated: true});
        } else if (req.session.userId){
            let userInformation = await userData.getUserById((req.session.userId).toString());
            res.render('sites/list', {
                userInformation,
                partial: 'sites-list-script',
                sites: siteInfo,
                authenticated: true});
        } else {
        res.render('sites/list', {
            partial: 'sites-list-script',
            sites: siteInfo});
        }
    }catch (e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) =>{
    let siteInfo = req.body;
    if(!siteInfo){
        res.status(400).render('admin/addNewSite', { message: "You must input a data", partial: 'addDailyData-script' });
        // res.status(400).json({error: "You must input a data"});
    }
    const {name, addressLine, apartment_suite_unitNumber, city, county, state, postalCode} = siteInfo;
    if(!name){
        // res.status(400).json({error: "You must input a name"});
        res.status(400).render('admin/addNewSite', { message: "You must input a sitename", partial: 'addDailyData-script' });
    }
    if(!addressLine){
        // res.status(400).json({error: "You must input a addressLine"});
        res.status(400).render('admin/addNewSite', { message: "You must input a addressLine", partial: 'addDailyData-script' });
    }
    if(!apartment_suite_unitNumber){
        // res.status(400).json({error: "You must input a apartment_suite_unitNumber"});
        res.status(400).render('admin/addNewSite', { message: "You must input a apartment_suite_unitNumber", partial: 'addDailyData-script' });
    }
    if(!city){
        // res.status(400).json({error: "You must input a city"});
        res.status(400).render('admin/addNewSite', { message: "You must input a city", partial: 'addDailyData-script' });
    }
    if(!county){
        // res.status(400).json({error: "You must input a county"});
        res.status(400).render('admin/addNewSite', { message: "You must input a county", partial: 'addDailyData-script' });
    }
    if(!state){
        // res.status(400).json({error: "You must input a state"});
        res.status(400).render('admin/addNewSite', { message: "You must input a state", partial: 'addDailyData-script' });
    }
    if(!postalCode){
        // res.status(400).json({error: "You must input a postalCode"});
        res.status(400).render('admin/addNewSite', { message: "You must input a postalCode", partial: 'addDailyData-script' });
    }
    let address = {
        addressLine: addressLine,
        apartment_suite_unitNumber : apartment_suite_unitNumber,
        city : city,
        county : county,
        state : state,
        postalCode : postalCode
    }
    // if(!reservation_history){
    //     res.status(400).json({error: "You must input a reservation_history"});
    // }
    // if(!comments_history){
    //     res.status(400).json({error: "You must input a comments_history"});
    // }
    // if(!rating){
    //     res.status(400).json({error: "You must input a rating"});
    // }
    try{
        const newSite = await vaccineData.createSite(name, address);
        // res.render('admin/addNewSite', {partial:"addNewSite-script"});
        res.redirect('/administration/getInfo');
    }catch (e){
        // res.status(500).json({error:e});
        res.status(500).render('admin/addNewSite', { message: e, partial: 'addDailyData-script' });
    }
});

router.post('/update', async (req, res) =>{
    const{siteId, name, address} = req.body;
    if(!req.session.adminId){
        return res.redirect('/private');
    }
    let oldSite;
    try{
        oldSite = await vaccineData.getSiteById(siteId);
    }catch (e){
        res.status(404).json({error: 'Site not found'});
        return ;
    }
    try{
        const siteInfo = await vaccineData.updateSite(siteId, name, address);
        res.status(200).send(siteInfo)
    }catch (e){
        res.status(500).json({error:e});
        // res.state(500).render('admin/admin',{error: e})
    }
});

router.post('/:id', async (req, res) =>{
    console.log("111111111")
    let commentInfo = req.body;   
    if(!req.session.userId) throw 'Please log in first';
    let userId = req.session.userId;
    let siteId = req.params.id;
    if(!commentInfo){
        res.status(400).json({error: "You must input a data"});
    }
    const {rating, comment} = commentInfo;
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
       
        const newComment = await commentsData.addComment(userId, siteId, rating, comment);
        await userData.addCommentIdFromUser(userId, (newComment._id).toString());
        await vaccineData.addCommentIdFromSite(siteId, (newComment._id).toString());
        
        res.status(200).send(newComment);
    }catch (e){
        res.status(500).json({error:e});
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
