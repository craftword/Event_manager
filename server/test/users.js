process.env.NODE_ENV = 'test';

import request from "supertest";
import { expect } from 'chai'
import models from "../models";
import app from "../../app";
const Users = models.Users;
const server = request.agent("http://localhost:9000");

//Our parent block
describe('API for SignIn and SignUp', () => {    
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
                   // expect(data.phone).to.equal("08967689609");
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

    describe('Test for SignIn', ()=> {
        it('respond with json when sign in with incorrect username ', (done)=> {
            const prob = {username:"dummy707", password:"dummy100"};
            server
                .post('/api/v1/user/signin')
                .send(prob)
                .end((err,res)=> {
                    const data = JSON.parse(res.text);
                    expect(res.status).to.equal(403);
                    expect(data.message).to.equal("Authentication failed. User not found.");
                    done();
                });
        });
        it('respond with json when sign in with incorrect password', (done)=> {
            const prob = {username:"dummy777", password:"dummy300"};
            server
                .post('/api/v1/user/signin')
                .send(prob)
                .end((err,res)=> {
                    const data = JSON.parse(res.text);
                    expect(res.status).to.equal(403);
                    expect(data.message).to.equal("Authentication failed. Wrong password.");
                    done();
                });
        });
        it('respond with json when sign in with correct details', (done)=> {
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

});