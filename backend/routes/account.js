const express = require("express");
const authMiddleware = require("../middlewares/middleware");
const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware.authMiddleware ,async (req,res)=>{
  const account = await Account.findOne({
    userId : req.userId
  })

  res.json({
    balance: account.balance
  })
})

accountRouter.post("/transfer",authMiddleware.authMiddleware ,async (req,res)=>{
  const session = new mongoose.startSession();

  session.startTransaction();
  const {amount,  to} = req.body;

  const account = await Account.findOne({
    userId : req.userId
  }).session(session);

  if(!account || account.balance < amount){
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficeint balance"
    })
  }


  const toAccount = await Account.findOne({
    userId: req.to
  }).session(session);

  if(!toAccount){
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account"
    })
  }

  await Account.updateOne(
    {
      userId:req.userId
    },
    {
      $inc:{
        balance: -amount
      }
    }
  ).session(session);

  await Account.updateOne(
    {
      userId:req.body.to
    },
    {
      $inc:{
        balance: req.body.amount
      }
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message:"Transfer successfull"
  })


})

module.exports = {
  accountRouter
}
