const Router = require('express');
const orderRouter = require(`./orderRouter`);
const productRouter = require(`./productRouter`);
const reviewRouter = require(`./reviewRouter`);
const typeRouter= require(`./typeRouter`);
const userRouter = require(`./userRouter`);

const router = new Router();

router.use("/order",  orderRouter);
router.use("/product",  productRouter);
router.use("/review",  reviewRouter);
router.use("/type",  typeRouter);
router.use("/user", userRouter);
module.exports = router;