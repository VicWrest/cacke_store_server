const bcrypt = require('bcryptjs') //для хеширования пароля
const jwt = require('jsonwebtoken'); //для создания jwt токен
const { User, Basket } = require('../models/models.js');
const tokenService = require('./tokenService.js'); 
require('dotenv').config();

class UserService {
	async registration(user) {
		const {userName} = user;
		console.log(userName);
		const candidate = await User.findOne({where: {name: userName}});
		if(candidate) {
			return;
		}
		const addedUser = await User.create({name: userName});
        const basket = await Basket.create({user_id: addedUser.id})
        const token =  tokenService.generateToken(addedUser.id, addedUser.name, addedUser.role)
		return token;
	}
	async login(data) {
		try{
		const { userName} = data;
        const user = await User.findOne({where: {name: userName}})
		if(!user) {
            return;
		};
		
		const token = await tokenService.generateToken(user.id, user.name, user.role)
		const validToken = await tokenService.validateAcessToken(token);
		console.log(validToken);
		return token;
		}
		catch(e) {
			console.log(e);
            return
		}
	}
	async getUserByUsername(userName){
		const user = User.findOne({where: {name: userName}})
		return user;
	}
}
module.exports = new UserService()