const express = require("express");
const Service = require("../models/service");
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

router.post("/services",upload.single('image'), (req, res, next) => {

      Service.create({
        name: req.body.name,
        image:req.file.path
      })
        .then(service => {
          res.send( service );
        })
        .catch(next);
    });

    router.get("/services", (req, res, next) => {
        Service.find({})
            .then((service) => {
                res.json(service);
            })
            .catch(next);
    })

    router.route('/services/:id')
    .get((req, res, next) => {
        Service.findById(req.params.id)
            .populate({
                path: 'service',
                select: 'name'
            })
            .then((service) => {
                res.json(service);
            }).catch(next);
        });

        router.route('/services/:id')
        .put((req, res, next) => {
            Service.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                .then((service) => {
                    res.send("Service Updated Successfully! ");
                }).catch(next);
        });

        router.route('/services/:id')
        .delete((req, res, next) => {
            Service.findOneAndDelete({ author: req.params._id, _id: req.params.id })
                .then((service) => {
                    if (service == null) throw new Error("Service not found!");
                    res.send("Service Deleted Successfully! ");
                }).catch(next);
        });
    module.exports = router;

