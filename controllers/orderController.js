const ApiError = require("../error/ApiError");
const { Order } = require("../models/models");

class Controller {
    async createNewOrder(req, res, next){
        const {user_id} = req.body;
        const order = await Order.create({username: user_id});
        return;
    }
    async getAllOrders(req, res){
        const {username}= req.params;
        const orders = await Order.findAll({where: {username}})
        res.status(200).json(orders);
    }
};

module.exports = new Controller();