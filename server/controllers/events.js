import models from "../models";
const getEvent = models.Events;

const event = {
    // create a Event
    create(req, res) {
        return getEvent
            .count({
                where: { 
                    date:req.body.date
                },
                
            })
            .then(count => {
                if (count != 0) {
                    res.status(401).json({event: "Date is already been booked" })
                }else {
                    getEvent.create({
                        title: req.body.title,
                        description: req.body.description,
                        eventType: req.body.eventType,
                        venue: req.body.venue,
                        address: req.body.address,
                        contactPhone: req.body.contactPhone,
                        contactEmail: req.body.contactEmail,
                        date:req.body.date,
                        time: req.body.time,
                        userId: req.body.userId,
                        centerId:req.body.centerId,
                    })
                    .then(result => res.status(201).send(result).json({event: "Created successful" }))
                    .catch(error => res.status(400).send(error));
                }       
            
            })
            .catch(error => res.status(400).send(error));
            
    },
    
    // view details of an event
    view(req, res) {
        return getEvent
            .findAll({
                where: {
                    id: req.params.eventId,              
                  },
            })            
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error));
    },
    // update a Event
    update(req, res) {
        return getEvent
        .find({
            where: {
              id: req.params.eventId,              
            },
          })
          .then(event => {
            if (!event) {
              return res.status(404).send({
                message: 'event Not Found',
              });
            }
            return event
            .update({
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
                centerId:req.body.centerId,
             })                            
            .then(result => res.status(201).send(result).json({event: "Updated successful" }))
            .catch(error => res.status(400).send(error)); 
          })
          .catch(error => res.status(400).send(error));

    },
    // delete a Event
    destroy(req, res) {
        return getEvent
          .findById(req.params.eventId)
          .then(event => {
            if (!event) {
              return res.status(400).send({
                message: 'Event Not Found',
              });
            }
            return event
              .destroy()
              .then(() => res.status(204).send({event: "Deleted successful" }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
};

export default event;