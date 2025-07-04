const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  imgUrl:{
    type:String,
    require:true
  },
  content:{
    type:String,
    require:true,
  },
  blogType : {
    type:String,
    require : true
  },
  summary:{
    type:String,
    require :true
  },
  userName : {
    type:String,
    require :true
  }

})

const blog = mongoose.model("blog",userSchema)

module.exports =  blog