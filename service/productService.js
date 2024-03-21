const uuid = require("uuid");
const path = require("path");

const { Product } = require("../models/models");

class Service {
    async downloadImg(id, img) {
        const product = Product.findOne({where: {id}});
        let fileName = uuid.v4() + ".jpg"
        console.log(img)
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        product.img = fileName;
        return product;
    }
}

module.exports = new Service();