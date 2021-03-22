const request  = require('supertest');
const express = require('express');

const patientRouter = require('../routes/patientRouter');

const app = express();
app.use('/patient', patientRouter);
describe('Test of Patient Router',()=>{
    test('Get Some Users',()=>{
    return request(app)
      .get('/patient/testPatient')
      .then((res)=>{
        console.log(res);
        expect(res.statusCode).toBe(200);
      })
    })
  })