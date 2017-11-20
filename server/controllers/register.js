import models from "../models";
import bcrypt from "bcrypt";
const createUser = models.Users;

const create = (req, res) => {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    return createUser
       
        .create({
            email: req.body.email,
            username: req.body.username,
            password: password,
            fullname: req.body.fullname,
            phone: req.body.phone
            
        })
        .then(users => res.status(201).json({
            "fullname":users.fullname,
            "email":users.email,
            "Id":users.id,
            "username":users.username
        }))
        .catch(error => res.status(400).send(error)); 
};

export default create;