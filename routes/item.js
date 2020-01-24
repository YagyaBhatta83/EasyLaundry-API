const express = require("express");
const Item = require("../models/item");
const router = express.Router();
const auth = require('../auth');

router.post("/items", (req, res, err) => {

  Item.create(req.body)
  .then((item) => {
      res.statusCode = 201;
      res.json(item);
  })
        .catch(err => {
            res.status(500).send(err)
        });
    });


router.get("/items", (req, res, next) => {
  Item.find({})
      .then((item) => {
          res.json(item);
      })
      .catch(next);
})

router.route('/:id')
.get((req, res, next) => {
    Item.findById(req.params.id)
        .populate({
            path: 'item',
            select: 'name'
        })
        .then((item) => {
            res.json(item);
        }).catch(next);
    });

    router.route('/items/:id')
    .put((req, res, next) => {
        Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((item) => {
                res.send("Item Updated Successfully! ");
            }).catch(next);
    });

    module.exports = router;

