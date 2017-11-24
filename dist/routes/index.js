"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _users = require("../controllers/users");

var _users2 = _interopRequireDefault(_users);

var _jwtAuth = require("../middlewares/jwtAuth");

var _jwtAuth2 = _interopRequireDefault(_jwtAuth);

var _checkAdmin = require("../middlewares/checkAdmin");

var _checkAdmin2 = _interopRequireDefault(_checkAdmin);

var _events = require("../controllers/events");

var _events2 = _interopRequireDefault(_events);

var _centers = require("../controllers/centers");

var _centers2 = _interopRequireDefault(_centers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appApi = app => {
    app.get("/api/v1", (req, res) => res.status(200).send({
        message: "Welcome to the Owanbe Event Manager App!"
    }));
    // login and signIn
    app.post("/api/v1/user/signup", _users2.default.create);
    app.post("/api/v1/user/signin", _users2.default.signIn);

    // Events Endpoints
    app.post("/api/v1/events/", _jwtAuth2.default, _events2.default.create);
    app.put("/api/v1/events/:eventId", _jwtAuth2.default, _events2.default.update);
    app.get("/api/v1/events/:eventId", _jwtAuth2.default, _events2.default.view);
    app.delete("/api/v1/events/:eventId", _jwtAuth2.default, _events2.default.destroy);

    // Centers Endpoints
    app.post("/api/v1/centers/", _jwtAuth2.default, _checkAdmin2.default, _centers2.default.create);
    app.put("/api/v1/centers/:centerId", _jwtAuth2.default, _checkAdmin2.default, _centers2.default.update);
    app.get("/api/v1/centers/:centerId", _jwtAuth2.default, _centers2.default.view);
    app.get("/api/v1/centers/", _centers2.default.list);
};

exports.default = appApi;