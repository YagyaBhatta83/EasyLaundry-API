const express = require("express");
const Item = require("../models/item");
const router = express.Router();
const auth = require('../auth');
const multer = require('multer');
const path = require("path");


const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

router.post("/items",upload.single('image'), (req, res, err) => {

  Item.create(
      {
          name:req.body.name,
          price:req.body.price,
          image:req.file.path
      }
  )
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
        res.send("Item not found! ");
      })
      .catch(next);
})

router.route('/items/:id')
.get((req, res, next) => {
    Item.findById(req.params.id)
        .populate({
            path: 'item',
            select: 'name'
        })
        .then((item) => {
            res.send("Item not found! ");
        }).catch(next);
    });

    router.route('/items/:id')
    .put((req, res, next) => {
        Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((item) => {
                res.send("Item Updated Successfully! ");
            }).catch(next);
    });

    router.route('/items/:id')
    .delete((req, res, next) => {
        Item.findOneAndDelete({ author: req.params._id, _id: req.params.id })
            .then((item) => {
                if (item == null) throw new Error("item not found!");
                res.send("item Deleted Successfully! ");
            }).catch(next);
    });

    module.exports = router;