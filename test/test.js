process.env.NODE_ENV = 'test';

import request from "supertest";
import { expect } from 'chai'
import models from "../server/models";
import app from "../app";
const Users = models.Users;
const server = request.agent("http://localhost:9000");

//Our parent block
describe('users', () => {
    before((done) => {
        Users.sync({ force : true }) // drops table and re-creates it
          .success(() => {
            done(null);
          })
          .error((error) => {
            done(error);
          });
    });
});
describe('Test for Models', ()=> {
    it('respond with json after signup', (done)=> {
        const prob = {
            username:"dummy777", 
            password:"dummy100",
            fullname:"dummy Dum",
            email:"mummy@gmail.com",
            phone:"08967689609"            
        };
        server
            .post('/api/v1/user/signup')
            .send(prob)
            .end((err,res)=> {
                const data = JSON.parse(res.text);
                expect(res.status).to.equal(201);
                expect(data.username).to.equal("dummy777");
                expect(data.fullname).to.equal("dummy Dum");
                expect(data.email).to.equal("mummy@gmail.com");
                //expect(data.phone).to.equal("08967689609");
                done();
            });
    });
    it('respond with a 404 error when signUp with a register username', (done)=> {
        const prob = {
            username:"dummy777", 
            password:"dummy100",
            fullname:"dummy Dum",
            email:"mummy@gmail.com",
            phone:"08967689609"            
        };
        server
            .post('/api/v1/user/signup')
            .send(prob)
            .end((err,res)=> {
                const data = JSON.parse(res.text);
                expect(res.status).to.equal(400);
                done();
            });
    });

});

describe('Test for Models', ()=> {
    it('respond with json', (done)=> {
        const prob = {username:"dummy777", password:"dummy100"};
        server
            .post('/api/v1/user/signin')
            .send(prob)
            .end((err,res)=> {
                const data = JSON.parse(res.text);
                expect(res.status).to.equal(200);
                expect(err).to.be.null;
                expect(data.token).to.not.have.property(null);
                done();
            });
    });

});