import supertest from 'supertest';
import { expect } from 'chai'
import models from '../models';
import app from '../../app';
const Users = models.Users;
const request = supertest.agent(app);

const validSignupSeed = [{
    fullname:'Abimbola Olaitan',
    username: 'craftword',
    email: 'kenolusola@gmail.com',
    password: 'godword20',
    phone:'08027313450',
    role:'admin'
  }, {
    fullname: 'Efosa Okpugie',
    username: 'fosa',
    email: 'efosaokpugie@gmail.com',    
    password: 'iloveandela',
    phone:'08027313450',
    role:'user'
  }],

  invalidSignupSeed = [
    {
      fullname: '   ',
      email: 'paulsmith@gmail.com',
      username: 'fosa',
      password: 'thisisapassword',
      phone:'08027313450',
      role:'user'
    }, {
      fullname: 'paul Smith',
      email: ' ',
      username: 'fosa',
      password: 'thisisapassword',
      phone:'08027313450',
      role:'user'
    }, {
      fullname: 'paul Smith',
      email: 'paulsmith@gmail.com',
      username: ' ',
      password: 'thisisapassword',
      phone:'08027313450',
      role:'user'
    }, {
      fullname: 'paul Smith',
      email: 'paulsmith@gmail.com',
      username: 'fosa ',
      password: ' ',
      phone:'08027313450',
      role:'user'
    },
    {
      fullname: 'paul Smith',
      email: 'paulsmith@gmail.com',
      username: ' fosa',
      password: 'thisisapassword',
      phone:'08027313450',
      role:' '
    }],

  validLoginSeed = [
    {
      username: 'craftword',
      password: 'godword20' //admin
    },
    {
      username: 'fosa',
      password: 'iloveandela' //user
    },
  ],
  invalidLoginSeed = [
    {
      username: 'xsaghsyei',
      password: 'godword20' //admin
    },
    {
      username: 'fosa',
      password: 'gsfdhdjkdj' //user
    },
  ],
  userToken = [];

describe('Event Manager', () => {
  describe('Test Server Connection', () => {
    it('should respond with welcome message and status code 200', (done) => {
      request
        .get('/api/v1')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.body.message).to.equal('Welcome to the Owanbe Event Manager App!');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
 
  it('should respond with message and status code 200 when access a non api', (done) => {
    request
      .get('/')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.body.message).to.equal('Welcome to the beginning of nothingness.');
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
});

describe('signup API', () => {
  it('should return 400 for empty username', (done) => {
    request
      .post('/api/v1/users')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidSignupSeed[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return 400 for empty password', (done) => {
    request
      .post('/api/v1/users')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidSignupSeed[2])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should return 400 for empty email', (done) => {
    request
      .post('/api/v1/users')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidSignupSeed[3])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should return 201 for valid login', (done) => {
    request
      .post('/api/v1/users/login')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validLoginSeed [0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);       
        expect(res.body.token).to.not.have.property(null);        
        done();
      });
  });

  it('should return 403 and message for invalid username', (done) => {
    request
      .post('/api/v1/users/login')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidLoginSeed [0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed. User not found.');       
        done();
      });
  });
  it('should return 403 and message for invalid password', (done) => {
    request
      .post('/api/v1/users/login')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidLoginSeed [1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed. Wrong password.');       
        done();
      });
  });
 
});