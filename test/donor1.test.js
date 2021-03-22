const request  = require('supertest');
const express = require('express');
const donorRouter = require('../routes/donorRouter');

const app = express();
app.use('/donor',donorRouter);
describe('Test of Patient Router',()=>{
    test('ashma',()=>{
    return request(app)
      .get('/donor/testDonor')
      .then((res)=>{
        console.log(res);
        expect(res.statusCode).toBe(200);
      })
    })
  })