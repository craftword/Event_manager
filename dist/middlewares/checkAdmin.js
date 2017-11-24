'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

const checkAdmin = (request, response, next) => {
    if (request.decoded.role != 'admin') {
        response.json({ message: 'Permission denied.' });
    } else {
        next();
    }
};

exports.default = checkAdmin;