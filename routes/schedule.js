const express = require("express");
const Schedule = require("../models/schedule");
const router = express.Router();
const auth = require('../auth');

router.post("/schedules", (req, res, err) => {
    Schedule.create(req.body)
    .then((schedule) => {
        res.statusCode = 201;
        res.json(schedule);
    })
          .catch(err => {
              res.status(500).send(err)
          });
      });

      router.get("/schedules", (req, res, next) => {
        Schedule.find({})
            .then((schedule) => {
              res.json(schedule);
            })
            .catch(next);
      })
      
module.exports = router;
