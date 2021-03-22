const mongoose = require('mongoose');
const { model } = require('./Patients');
const Schema  = mongoose.Schema;

let Event = new Schema({

    eventName:{
        type:String,
        required:true
    },
    eventData:{
        type:Date,
        required:true
    },
    eventLocation:{
        type:String,
        required:true
    }
    },{
        collection:'Events'
});
module.exports = mongoose.model('Events', Event);