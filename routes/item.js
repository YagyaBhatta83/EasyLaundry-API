const express = require("express");
const Item = require("../models/item");
const router = express.Router();

router.post("/items", (req, res, next) => {

      Item.create({
        name: req.body.name,
        price:req.body.price
      })
        .then(item => {
          res.send( item );
        })
        .catch(next);
    });
    module.exports = router;

