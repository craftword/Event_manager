"use strict";

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require("chai");

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = _models2.default.Users;
const server = _supertest2.default.agent("http://localhost:9000");

describe('Test for SignIn', () => {

    it('respond with json when sign in with incorrect password', done => {
        const prob = { username: "dummy777", password: "dummy300" };
        server.post('/api/v1/user/signin').send(prob).end((err, res) => {
            const data = JSON.parse(res.text);
            (0, _chai.expect)(res.status).to.equal(403);
            (0, _chai.expect)(data.message).to.equal("Authentication failed. Wrong password.");
            done();
        });
    });
});