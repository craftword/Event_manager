import request from "supertest";
import { expect } from 'chai'
import models from "../models";
import app from "../../app";
const Users = models.Users;
const server = request.agent("http://localhost:9000");


describe('Test for SignIn', ()=> {
       
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
    

});