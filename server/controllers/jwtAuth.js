//const UserModel = require('../models/users');
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// load environment
dotenv.load();
//Authentication secret
const secret_token = process.env.SECRET;

const auth = (req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, secret, (err, decoded) => {      
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
            } 
            else {
            // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

    }



};


const checkAdmin = (request, response, next) => {
    if (request.decoded.role != 'admin') {
        response.json({message: 'Permission denied.' });
    }
    else {
        next();
    }
};

export default auth;
