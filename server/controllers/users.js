import models from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // used to create, sign, and verify tokens
import dotenv from 'dotenv';

// load environment
dotenv.load();

const createUser = models.Users;
//Authentication
const secret_token = process.env.SECRET;

const users = {
     create (req, res) {
        const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
        return createUser       
            .create({
                email: req.body.email,
                username: req.body.username,
                password: password,
                fullname: req.body.fullname,
                phone: req.body.phone,
                role:req.body.role            
            })
            .then(users => res.status(201).json({
                "fullname":users.fullname,
                "email":users.email,
                "id":users.id,
                "username":users.username,
                "role":users.role
            }))
            .catch(error => res.status(400).send(error)); 
    },
    signIn(req, res){
        
            return createUser
                .findOne({
                    where: {
                        username:req.body.username,                   
                    }
                })
                .then(user => {
                    if(user === null) {
                        res.status(403).json({ success: false, message: "Authentication failed. User not found." });
                    }
                    //to compare password that user supplies in the future
                    let hash = user.password;
                    bcrypt.compare(req.body.password, hash, (err, doesMatch)=>{
                        if (doesMatch){
                            // if user is found and password is right
                            // create a token
                            // expire in one hour
                            const payload = {
                                role: user.role,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                data:user.username
                              };
                               
                            const token = jwt.sign(payload, secret_token);
                            //console.log(token);
                            // return the information including token as JSON
                            res.status(200).json({
                                success: true,
                                message: "Welcome Home!",
                                role:user.role,
                                token: token
                            });
        
                        }else{
                        //go away
                            res.status(403).json({ success: false, message: "Authentication failed. Wrong password." });
                        }
                    });
                })
                
        
        },
}

export default users;