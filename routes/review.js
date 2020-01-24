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

      module.exports = router;