const mongoose=require('mongoose');

const scheduleSchema = new mongoose.Schema({
date:{
type:String,
required:true
},
time:{
  type:String,
  required:true
},
location:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true
  },
item: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Item'
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{ timestamps: true });

module.exports=mongoose.model("Schedule",scheduleSchema)