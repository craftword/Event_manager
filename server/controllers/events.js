import models from "../models";
const getEvent = models.Events;

const event = {
    create(req, res) {
        return getEvent
            .findOrCreate({
                where: { 
                    date:req.body.date
                },
                defaults: {
                title: req.body.title,
                description: req.body.description,
                eventType: req.body.eventType,
                venue: req.body.venue,
                address: req.body.address,
                contactPhone: req.body.contactPhone,
                contactEmail: req.body.contactEmail,
                time: req.body.time,
                userId: req.body.userId,
                centerId:req.body.centerId,
                }                
            })
            .then(result => {
               res.status(201).json({event: "Created successful..." })
            })
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return getEvent
            .findAll()            
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));
    },
    put(req, res) {

    },
    destory(req, res) {

    },
};

export default event;