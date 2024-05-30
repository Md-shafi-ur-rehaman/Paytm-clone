const express = require("express");
// const zod = require("zod");
const {User, Account} = require("../db");
const {authMiddleware} = require("../middlewares/middleware");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const userRouter = express.Router();

userRouter.get("/",(req,res)=>{
  res.status(200).json({message:"running get route"})
})

// const signupBody = zod.object({
//   username:zod.string().email(),
//   password:zod.string(),
//   // mobileNo:zod.number(),
//   firstname:zod.string(),
//   lastname:zod.string()
// })

userRouter.post("/signup", async (req,res)=>{
  console.log(req.headers);
  // const { success } = signupBody.safeParse(req.body);
  // const {error} = signupBody.safeParse(req.body);
  // console.log(error);

  // if(!success){
  //   return res.status(411).json({
  //     message:"Email already taken / Incorrect inputs"
  //   })
  // }

  const existingUser = await User.findOne({
    username: req.body.username
  })

  if(existingUser){
    return res.status(411).json({
      message:"Email already taken"
    })
  }

  const user = await User.create({
    username:req.body.username,
    password:req.body.password,
    mobileNo:req.body.mobileNo,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
  })
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
  })

  const token = jwt.sign({
    userId
  }, JWT_SECRET);

  res.json({
    message:"User created successfully",
    token: token
  })

})


// const loginBody = zod.object({
//   username:zod.string().email(),
//   password:zod.string()
// })

userRouter.post("/login", async (req, res)=>{
  console.log(req.headers);
  // const {success} = loginBody.safeParse(req.body);
  // if(!success){
  //   return res.status(411).json({
  //     message:"Incorrect inputs"
  //   })
  // }


  // if(!req.body.username || !req.body.password){
  //   res.status(400).json({message:"please fill all info"});
  //   return;
  // }

  const user = await User.findOne({
    username:req.body.username,
    password:req.body.password,
  })

  if(user){
    const token = jwt.sign({userId:user._id},JWT_SECRET);
    res.status(200).json({token:token})
    return;
  }

  res.status(411).json({
    message:"Error while logging in"
  })
})


// const updateBody = zod.object({
//   password:zod.string().optional(),
//   firstname:zod.string().optional(),
//   lastname:zod.string().optional(),
// })


userRouter.put("/",()=>{authMiddleware.authMiddleware()}, async (req, res) => {
    // const { success } = updateBody.safeParse(req.body)
    // if (!success) {
    //     res.status(411).json({
    //         message: "Error while updating information"
    //     })
    // }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})


userRouter.get("/bulk", async () => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or:[
      {
        firstname : {
          "$regex" : filter
        }
      },
      {
        lastname:{
          "$regex" : filter
        }
      }
     ]
  })

  res.json({
    user:users.map(user => ({
      username:user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      _id:user._id
    }))
  })
})







module.exports = {userRouter};
