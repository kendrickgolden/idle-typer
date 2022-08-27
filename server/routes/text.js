const express = require('express');
const router = express.Router();
const Text = require('../models/text');

router.get('/', async function(req,res) {
    const text = Text.findOne({ 'title' : req.query.title }, async (error,data) => {
        if(error){
            console.log("Could not find text:" + error);
    } else {
        console.log(data);
        res.json(data);
        
    }});
    
   // res.json("test");

});


module.exports = router;