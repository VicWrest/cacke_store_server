const ApiError = require("../error/ApiError");
const { Order, Product } = require("../models/models");

const productService = require("../service/productService");

class Controller{
    constructor(){

    };

    async createNewProduct(req, res, next){
        try{
            const {name, price, type, korzh} = req.body;
            const img = req.files.img;
            const product = await Product.create({name, price, type, korzh});

            if(img) {
                 const newProduct = await productService.downloadImg(product.dataValues.id, img);
                 console.log(newProduct)
                 return res.json(newProduct);     
            }
            return res.json(product);
        }
        catch(err){
            console.log(err);
            next(ApiError.badRequest("Ошибка создания товара"));
        }
        
    }
    
    async getAllOrders(req, res){
        const {username}= req.params;
        const orders = await Order.findAll({where: {username}})
        res.status(200).json(orders);
    }

};

module.exports = new Controller();