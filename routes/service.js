const express = require("express");
const Service = require("../models/service");
const router = express.Router();

router.post("/services", (req, res, next) => {

      Service.create({
        name: req.body.name
      })
        .then(service => {
          res.send( service );
        })
        .catch(next);
    });

    router.get("/services", (req, res, next) => {
        Service.find({})
            .then((service) => {
                res.json(service);
            })
            .catch(next);
    })

    router.route('/:id')
    .get((req, res, next) => {
        Service.findById(req.params.id)
            .populate({
                path: 'tasks',
                select: 'name'
            })
            .then((service) => {
                res.json(service);
            }).catch(next);
        })
    module.exports = router;

