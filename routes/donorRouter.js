const express = require('express');
const donorRouter = express.Router();

let Donor = require('../models/Donor');
donorRouter.route('/add').post(function (req, res){
    let donor = new Donor(req.body);
    donor.save()
    .then(donor=>{
        res.status(200).json({'Donor':'Donor successfully inserted'});
    })
    .catch(err =>{
        res.status(401).send('Failed');
    });
});

donorRouter.route('/').get(function(req, res){
    Donor.find(function(err, donors){
        if(err){
            console.log("Error in getting donors");
        }
        else{
            res.json(donors);
        }
    })
})

donorRouter.route('/edit/:id').get(function(req, res){
    Donor.findById(req.params.id, function(err, donor){
        if(err){
            console.log("Error in getting");
        } else{
            res.json(donor);
        }
    })
})

donorRouter.route('/update/:id').post(function(req, res){
    Donor.findByIdAndUpdate(req.params.id, function(err, donor){
        if(err){
            console.log('Error in updating');
        } else{
            donor.FullName = req.body.FullName;
            donor.Email = req.body.Email;
            donor.bGroup = req.body.bGroup;
            donor.Address = req.body.Address;

            donor.save().then(donor =>{
                res.json('Update Complete');
            }).catch(err=>{
                res.status(400).send('Update not Complete');
            });
        }

    })
})
donorRouter.route('/delete/:id').post(function(req, res){
    Donor.findByIdAndDelete(req.params.id, function(err, donor){
        if(err) res.json(err);
        else{
            res.status(200).json('Delete Successfull');
        }
    })
});

donorRouter.route('/testDonor').get(function(req,res){
    res.send('ashma');
})

module.exports = donorRouter;