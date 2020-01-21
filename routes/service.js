const express = require("express");
const Service = require("../models/service");
const router = express.Router();
const auth = require('../auth');


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
                path: 'service',
                select: 'name'
            })
            .then((service) => {
                res.json(service);
            }).catch(next);
        });

        router.route('/:id')
        .put((req, res, next) => {
            Service.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                .then((service) => {
                    res.json(service);
                }).catch(next);
        });
    module.exports = router;

