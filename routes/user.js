const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../routes/register");
const validateLoginInput = require("../routes/login");
// Load User model
const User = require("../models/Users");
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address,
          phone: req.body.phone,


        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            firstName: user.firstName
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  router.get('/',(req, res)=>{
    User.find()
    .then((users)=>{
        res.json(users);
    }).catch((err)=> console.log(err));
 });


 router.get('/:user_id',(req, res)=>{
     User.findById(req.params.user_id)
     .then((user)=>{
         res.json(user);
     }).catch((err)=> console.log(err));
 })
 router.put('/:user_id',(req, res, next)=>{
    User.findByIdAndUpdate(req.params.user_id, {$set:req.body},{new:true})
    .then(updatedUser=>{
        res.json(updatedUser);
    }).catch(next);
})
router.delete('/:user_id',(req, res, next)=>{
    User.deleteOne({_id:req.params.user_id})
    .then(reply=>{
        res.json(reply);
    }).catch(next);
});
router.get('/testUser',(req,res)=>{
  res.send('User');
});


  module.exports = router;