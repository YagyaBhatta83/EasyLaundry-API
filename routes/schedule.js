const {express} = require("./../config");
const router = express.Router();
const Schedule = require("../models/schedule");
const auth = require('../auth');

router.post("/schedules",auth.verifyUser, (req, res, next) => {
    Schedule.create({
        date:req.body.date,
          time:req.body.time,
          location:req.body.location,
          noofitem:req.body.noofitem,
          service: req.body.service,
          item: req.body.item,
          user: req.user._id
    })
    .then((schedule) => {
        res.statusCode = 201;
        res.json(schedule);
    })
          .catch(err => {
              res.status(500).json(err)
          });
      });

      router.get("/schedules", (req, res, next) => {
        Schedule.find({})
            .then((schedule) => {
              res.json(schedule);
            })
            .catch(err=>next(err));
      });

router.route('/schedules/:id')
.get((req, res, next) => {
    Schedule.findById(req.params.id)
        .populate({
            path: 'schedule',
            select: 'date'
        })
        .then((schedule) => {
            res.json(schedule);
        }).catch(err=>next(err));
    })
.put(auth.verifyUser, auth.verifyAdmin,(req, res, next) => {
        Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((schedule) => {
                res.json({message:"order Updated Successfully! "});
            }).catch(err=>next(err));
    })
.delete(auth.verifyUser, auth.verifyAdmin,(req, res, next) => {
        Schedule.findOneAndDelete({ _id: req.params.id })
            .then((schedule) => {
                if (schedule == null) throw new Error("order not found!");
                res.json("order Deleted Successfully! ");
            }).catch(err=>next(err));
    });
      
module.exports = router;
