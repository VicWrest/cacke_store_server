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
                 return res.json(newProduct);     
            }
            return res.json(product);
        }
        catch(err){
            console.log(err);
            next(ApiError.badRequest("Ошибка создания товара"));
        }
        
    }
    
    async getAllProducts(req, res){
        try{
            const {typeId} = req.params;
            let products;
            if(typeId){
                products = Product.findAll({where : {typeId}})
            }
            else{
                products = Product.findAll({})
            }
            return res.json(products);         
        }
        catch(err){
            next(ApiError.badRequest("Ошибка получения товара"));
    };
   };
   
   async getProductById(req, res){
        try{
            const {id} = req.params;
           const product = Product.findOne({
       where : {id},
       include: [{model: ProductInfo, as: 'info'}]
       })
            return res.json(product);         
        }
        catch(err){
            next(ApiError.badRequest("Ошибка создания товара"));
    };
   };
   
   async uploadImg(req, res, next){
      try{
         const {id} = req.id;
         const img = req.files.img;
         if(!img) {
          next(ApiError.badRequest("Не удалось получить фото"))   
        }
        const product = await productService.downloadImg(product.dataValues.id, img);
        return res.json(product);
        }
        catch(err){
            console.log(err);
            next(ApiError.badRequest("Ошибка создания товара"));
        }
        
    }
};

module.exports = new Controller();