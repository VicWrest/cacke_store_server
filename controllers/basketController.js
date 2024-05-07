const ApiError = require("../error/ApiError");
const { Order, Product, User, OrderProduct } = require("../models/models");
const userService = require("../service/");
const userController = require("./userController");

class Controller {
    async addProductInBasket(req, res, next){
        //username достал из req.user, можно реализовать из req.body
        const user = req.user;
        const {product} = req.body;
        let baket = Basket.findOne({where: {user_id: user.id}});
        (if !basket){
            basket = Basket.create({user_id: user.id});
        }
        const prodById = await Product.findOne({where: {id: product.id}});
        const userBasket = await basket.addProduct(prodById);
        return res.json(userBasket);
    }
    
    async getProducts(req, res){
        const user = req.user;
        const basket = Basket.findOne({where: {user_id: user.id}, include: Product})
        return res.status(200).json(basket);
    }
    
    async deleteProductById(req, res){
        const productId = req.params.id;
        const user = req.user;
        const basket = Basket.findOne({where: {user_id: user.id}});
        const product = Product.findOne({where: {id: productId}});
        if(!product){
            next(ApiError.badRequest("Серверная ошибка при удалении пролукта"));
        }
        const deletedProduct = await basket.removeProduct(product);
        return res.status(200).json(deletedProduct);
    }
    
    async deleteAllProducts(req, res){
        const user = req.user;
        const basket = Basket.findOne({where: {user_id: user.id}});
        await basket.destroy()
        return res.status(200).json(null);
    }
    
};
module.exports = new Controller();