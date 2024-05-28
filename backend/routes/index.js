// backend/api/index.js
const express = require('express');
const userRouter = require('./user');

const router = express.Router();
router.user("/user", userRouter);

module.exports = router;
