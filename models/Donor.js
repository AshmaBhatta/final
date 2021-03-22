const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Donor = new Schema({
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
    collection: 'donor'
});

module.exports = mongoose.model('Donor', Donor);
