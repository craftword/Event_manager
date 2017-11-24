"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load environment
_dotenv2.default.load(); // used to create, sign, and verify tokens


const createUser = _models2.default.Users;
//Authentication
const secret_token = process.env.SECRET;

const users = {
    create(req, res) {
        const password = _bcrypt2.default.hashSync(req.body.password, _bcrypt2.default.genSaltSync(8), null);

        return createUser.create({
            email: req.body.email,
            username: req.body.username,
            password: password,
            fullname: req.body.fullname,
            phone: req.body.phone,
            role: req.body.role
        }).then(users => {
            if (users) {
                const payload = {
                    role: users.role,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: users.username
                };

                const token = _jsonwebtoken2.default.sign(payload, secret_token);
                res.status(201).json({
                    user: {
                        "fullname": users.fullname,
                        "email": users.email,
                        "username": users.username,
                        "role": users.role,
                        token: token

                    }
                });
            }
        }).catch(error => res.status(400).send(error.message));
    },
    signIn(req, res) {

        return createUser.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (user === null) {
                res.status(403).json({ success: false, message: "Authentication failed. User not found." });
            }
            //to compare password that user supplies in the future
            let hash = user.password;
            _bcrypt2.default.compare(req.body.password, hash, (err, doesMatch) => {
                if (doesMatch) {
                    const payload = {
                        role: user.role,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60,
                        data: user.username
                    };

                    const token = _jsonwebtoken2.default.sign(payload, secret_token);
                    res.status(200).json({
                        success: true,
                        message: "Welcome Home!",
                        role: user.role,
                        token: token
                    });
                } else {

                    res.status(403).json({ success: false, message: "Authentication failed. Wrong password." });
                }
            });
        });
    }
};

exports.default = users;