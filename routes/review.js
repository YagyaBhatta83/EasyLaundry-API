const express = require("express");
const Review = require("../models/review");
const router = express.Router();
const auth = require('../auth');

router.post("/reviews", (req, res, err) => {
    Review.create(req.body)
    .then((review) => {
        res.statusCode = 201;
        res.json(review);
    })
          .catch(err => {
              res.status(500).send(err)
          });
      });

      router.get("/reviews", (req, res, next) => {
        Review.find({})
            .then((review) => {
              res.send(review);
            })
            .catch(next);
      });

      router.route('/reviews/:id')
      .get((req, res, next) => {
          Review.findById(req.params.id)
              .populate({
                  path: 'review',
                  select: 'message'
              })
              .then((review) => {
                  res.send("review not found!");
              }).catch(next);
          });

          router.route('/reviews/:id')
          .put((req, res, next) => {
              Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                  .then((review) => {
                      res.send("review Updated Successfully! ");
                  }).catch(next);
          });

          router.route('/reviews/:id')
          .delete((req, res, next) => {
              Review.findOneAndDelete({ author: req.params._id, _id: req.params.id })
                  .then((review) => {
                      if (review == null) throw new Error("review not found!");
                      res.send("review Deleted Successfully! ");
                  }).catch(next);
          });

      module.exports = router;