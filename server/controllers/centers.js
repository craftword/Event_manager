import models from "../models";
const getCenter = models.Centers;


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
               res.status(201).send(error).json({Center: "Created successful..." })
            })
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return getCenter
            .findAll()            
            .then(result => res.status(200).send(re.sult))
            .catch(error => res.status(400).send(error));
    },
    view (req, res) {
        
    }, 
    put(req, res) {

    },
    destory(req, res) {

    },
};

export default center;