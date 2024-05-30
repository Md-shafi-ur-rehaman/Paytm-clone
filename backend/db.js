const mongoose = require("mongoose");

try{
  mongoose.connect("mongodb://localhost:27017/paytm",);
  console.log("connected to database");
}
catch(err){
  console.log(err)
}

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    minLength:3,
    maxLength:30
  },
  password: {
    type:String,
    required:true,
    minLength:6
  },
  mobileNo: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    minLength:10,
    maxLength:10,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastname:{
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  }
})

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"userId",
    required:true
  },
  balance:{
    type:Number,
    required:true,
  }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account
}
