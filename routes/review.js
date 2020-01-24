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
              res.json(review);
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
                  res.send(review);
              }).catch(next);
          });

      module.exports = router;