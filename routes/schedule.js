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
      });

      router.route('/schedules/:id')
.get((req, res, next) => {
    Schedule.findById(req.params.id)
        .populate({
            path: 'schedule',
            select: 'date'
        })
        .then((schedule) => {
            res.send(schedule);
        }).catch(next);
    });

    router.route('/schedules/:id')
    .put((req, res, next) => {
        Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((schedule) => {
                res.send("order Updated Successfully! ");
            }).catch(next);
    });

    router.route('/schedules/:id')
    .delete((req, res, next) => {
        Schedule.findOneAndDelete({ author: req.params._id, _id: req.params.id })
            .then((schedule) => {
                if (schedule == null) throw new Error("order not found!");
                res.send("order Deleted Successfully! ");
            }).catch(next);
    });
      
module.exports = router;
