const uuid = require("uuid");
const path = require("path");

const { Review } = require("../models/models");

class Service {
    async downloadImg(id, img) {
        const review = Review.findOne({where: {id}});
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        review.img = fileName;
        return review;
    }
}

module.exports = new Service();