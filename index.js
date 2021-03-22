const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const patientRoutes = require('./routes/patientRouter');
const user = require('./routes/user');
const donorRouter = require('./routes/donorRouter');
const eventRouter = require('./routes/eventRouter');

const app = express();
mongoose.connect(process.env.DbURI,{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Connected to Database Server');
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',(req, res)=>{
    res.send('Welcome to my New App');
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
app.use('/api/users', user);
app.use('/patient', patientRoutes);
app.use('/donor', donorRouter);
app.use('/api/event', eventRouter );


app.listen(process.env.Port, ()=>{
    console.log(`Server is running in localhost:${process.env.Port}`);
});