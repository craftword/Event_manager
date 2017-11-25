"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const center = _models2.default.Centers;
const Events = _models2.default.Events;

const centerController = {
  create(req, res) {
    return center.create({
      name: req.body.name,
      description: req.body.description,
      venueType: req.body.venueType,
      image: req.body.image,
      address: req.body.address,
      location: req.body.location,
      capacity: req.body.capacity,
      policy: req.body.policy,
      price: req.body.price

    }).then(result => {
      res.status(201).send({ result, message: "Center created" });
    }).catch(error => res.status(400).send(error.message));
  },
  list(req, res) {
    return center.findAll().then(result => res.status(200).send(result)).catch(error => res.status(400).send(error.message));
  },
  view(req, res) {
    return center.findById(req.params.centerId, {
      include: [{
        model: Events,
        as: 'Event'

      }]
    }).then(center => {
      if (!center) {
        return res.status(404).send({
          message: 'Center Not Found'
        });
      }
      return res.status(200).send(center);
    }).catch(error => res.status(400).send(error.message));
  },

  update(req, res) {
    return center.find({
      where: {
        id: req.params.centerId
      }
    }).then(center => {
      if (!center) {
        return res.status(404).send({
          message: 'Center Not Found'
        });
      }
      return center.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        venueType: req.body.venueType,
        address: req.body.address,
        image: req.body.image,
        location: req.body.location,
        capacity: req.body.capacity,
        policy: req.body.policy,
        userId: req.body.userId

      }).then(result => res.status(201).send({ result, message: "Updated successful" })).catch(error => res.status(400).send(error.message));
    }).catch(error => res.status(400).send(error.message));
  }

};

exports.default = centerController;