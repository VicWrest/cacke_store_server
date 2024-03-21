const Router = require('express');
const { createNewOrder, getAllOrders } = require('../controllers/orderController');

const router = new Router();

router.post("/", createNewOrder);
router.get("/:username", getAllOrders);

module.exports = router;