import models from "../models";
const getEvent = models.Events;

const event = {
    create(req, res) {
        return getEvent
            .findOne({ 
                where: { 
                    date: req.body.date 
                } 
            })
            .then(result => {
                getEvent.create({
                    title: req.body.title,
                    description: req.body.description,
                    eventType: eventType,
                    venue: req.body.venue,
                    contactPhone: req.body.contactPhone,
                    contactEmail: req.body.contactEmail,
                    date: req.body.date,
                    time: req.body.time,
                })
                .then(users => res.status(201).json({event: "Created successful..." }))
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