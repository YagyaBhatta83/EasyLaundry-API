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

router.get('/items',(req,res)=>{
  Item.find({},(error,data)=>{
    res.json(data);
  })


})

    module.exports = router;

