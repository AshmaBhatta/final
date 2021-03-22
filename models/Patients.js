const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Patient = new Schema({
  FullName: {
    type: String
  },
  Email: {
    type: String
  },
  bGroup: {
    type: String
  },
  Address:{
    type:String
  }
},{
    collection: 'patient'
});

module.exports = mongoose.model('Patient', Patient);
