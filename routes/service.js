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
    module.exports = router;

