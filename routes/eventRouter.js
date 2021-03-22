const express = require('express');

const eventRouter = express.Router();

let Event = require('../models/Events');

eventRouter.route('/add').post(function(req,res){
    let event = new Event(req.body);
    event.save()
    .then(event=>{
        res.status(200).json({'Events':'Events Successfully inserted'})
    })
    .catch(err=>{
        res.status(401).send('Failed');
    })
});

eventRouter.route('/').get(function(req, res){
Event.find(function(err, events){
    if(err){
        console.log('Error');
    } else{
        res.json(events); 
    }
})
})
module.exports = Event;
