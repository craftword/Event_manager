"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Event = _models2.default.Events;

const event = {
    // create a Event
    create(req, res) {
        return getEvent.count({
            where: {
                date: req.body.date
            }

        }).then(count => {
            if (count != 0) {
                res.status(401).json({ message: "Center is already been booked" });
            } else {
                Event.create({
                    title: req.body.title,
                    description: req.body.description,
                    eventType: req.body.eventType,
                    venue: req.body.venue,
                    address: req.body.address,
                    contactPhone: req.body.contactPhone,
                    contactEmail: req.body.contactEmail,
                    date: req.body.date,
                    time: req.body.time,
                    userId: req.body.userId,
                    centerId: req.body.centerId
                }).then(result => res.status(201).send({ result, message: "Created successful" })).catch(error => res.status(400).send(error.message));
            }
        }).catch(error => res.status(400).send(error.message));
    },

    // view details of an event
    view(req, res) {
        return Event.findAll({
            where: {
                id: req.params.eventId
            }
        }).then(result => res.status(200).send(result)).catch(error => res.status(400).send(error.message));
    },
    // update a Event
    update(req, res) {
        return Event.find({
            where: {
                id: req.params.eventId
            }
        }).then(event => {
            if (!event) {
                return res.status(404).send({
                    message: 'event Not Found'
                });
            }
            return event.update({
                title: req.body.title,
                description: req.body.description,
                eventType: req.body.eventType,
                venue: req.body.venue,
                address: req.body.address,
                contactPhone: req.body.contactPhone,
                contactEmail: req.body.contactEmail,
                date: req.body.date,
                time: req.body.time,
                userId: req.body.userId,
                centerId: req.body.centerId
            }).then(result => res.status(201).send({ result, message: "Updated successful" })).catch(error => res.status(400).send(error.message));
        }).catch(error => res.status(400).send(error.message));
    },
    // delete a Event
    destroy(req, res) {
        return getEvent.findById(req.params.eventId).then(event => {
            if (!event) {
                return res.status(400).send({
                    message: 'Event Not Found'
                });
            }
            return event.destroy().then(() => res.status(204).send({ message: "Deleted successful" })).catch(error => res.status(400).send(error.message));
        }).catch(error => res.status(400).send(error.message));
    }
};

exports.default = event;