const User = require('./user.model');
const UserService = require('./user.service');
const { successfulCreated, successfulDeleted } = require('../../messages/success');
const { invalidToken, notFound } = require('../../messages/errors');


class UserController {

    static async getAllUsers(req, res) {
        try {
         const users = await UserService.getAll();
         return res.json(users.map(User.toResponse));
        } catch(e){
            return  invalidToken(res)
        }
    }

    static async createUser(req, res) {
        try{
           const newUser = await UserService.create(res, req.body)
           successfulCreated(res)
            return res.end(JSON.stringify(newUser));      
        } catch(e){
            return invalidToken(res)
        }
    }

    static async getUserById(req, res) {
           try {
        const user = await UserService.getOne(req.params.userId)
        if (!user) {
            return notFound(res)
        } 
            return res.json(user)
        
     } catch (e) {
            return invalidToken(res)
            }
    }

    static async updateUser(req, res) {
        try {
            const updatedUser = await UserService.update(res, req.body, req.params.userId);
             return res.json(updatedUser);
        } catch (e) {
            return invalidToken(res)
        }
    }

    static async deleteUser(req, res) {
        try {
            const deletedUser = await UserService.delete(res, req.params.userId);
            successfulDeleted(res)
            return res.end(JSON.stringify(deletedUser));
        } catch (e) {
            return invalidToken(res)
        }
    }
}





module.exports = UserController;

