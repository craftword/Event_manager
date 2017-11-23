import models from "../models";
const getCenter = models.Centers;
const Events = models.Events;


const center = {
    create(req, res) {
        return getCenter
            .create({
                name: req.body.name,
                description: req.body.description,
                venueType: req.body.venueType,
                image: req.body.image,
                address: req.body.address,
                location: req.body.location,
                capacity: req.body.capacity,
                policy: req.body.policy,
                price: req.body.price,                
                               
            })
            .then(result => {
               res.status(201).send(result).json({Center: "Created successful" })
            })
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return getCenter
            .findAll()            
            .then(result => res.status(200).send(re.sult))
            .catch(error => res.status(400).send(error));
    },
    view(req, res) {
        return getCenter
          .findById(req.params.centerId, {
            include: [{
              model: Events,
              as: 'Event',
              
            }],
          })
          .then(center => {
            if (!center) {
              return res.status(404).send({
                message: 'Center Not Found',
              });
            }
            return res.status(200).send(center);
          })
          .catch(error => res.status(400).send(error));
      },

    put(req, res) {

    },
    destory(req, res) {

    },
};

export default center;