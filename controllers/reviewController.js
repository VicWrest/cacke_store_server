const ApiError = require("../error/ApiError");
const { Review } = require("../models/models");

class Controller {
    async createNewReview(req, res, next){
        try{
           const {authorName, rating, description, img} = req.body;
        const img = req.files.img;
        const review = await Review.create({authorName, rating, description});
        if(img){
            const newReview = await reviewService.downloadImg(review.dataValues.id, img);
            return res.json(newReview);
        }
        return res.json(review); 
        }
        catch(err){
            console.log(err);
            next(ApiError.badRequest("Ошибка создания товара"));
        }
        
    }
    
    async getAllReviews(req, res, next){
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    }
};

module.exports = new Controller();