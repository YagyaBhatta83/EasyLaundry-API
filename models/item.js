const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
name:{
type:String,
required:true
},
price:{
  type:Number,
  required:true
},service: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Service'
}
},{ timestamps: true });

module.exports=mongoose.model("Item",itemSchema)


