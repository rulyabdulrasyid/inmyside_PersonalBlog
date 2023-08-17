const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const contentRouter = require("./contentRouter");
const categoryRouter = require("./categoryRouter");

router.use("/category", categoryRouter);
router.use("/users", userRouter);
router.use("/content", contentRouter);

module.exports = router;
