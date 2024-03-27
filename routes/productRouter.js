const Router = require('express');
const productController = require('../controllers/productController');

const router = new Router();

router.post("/", productController.createNewProduct);
router.post("/image", productController)
router.get("/", );
router.get("/:id");
router.delete("/:id");

module.exports = router;