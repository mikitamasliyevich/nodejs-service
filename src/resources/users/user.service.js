const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { writeDataToFile } = require('../../utils/fileService');
const { badRequest, notFound } = require('../../messages/errors');

const dataWay = path.resolve("./data/users.json")
// eslint-disable-next-line import/no-dynamic-require
const userData = require(dataWay);
const User = require('./user.model');


class UserService {
    static async getAll() {
        const users = await userData;
        return users;
    }

    static async create(res, user) {
        try{
            const newUser = await { id: uuidv4(), ...user };
            userData.push(newUser)
            const users =  userData.map(User.toResponse)
            writeDataToFile(dataWay,  users)
            const [firstUser] = users
            return  firstUser
        } catch(err){

            return badRequest(res)
        }
  
    }

   static async getOne(id) {
        const user = await userData.find((p) => p.id === id);
        return user
   }

   static async update(res, body, id) {
       try{

        const index = await userData.findIndex((p) => p.id === id);
        userData[index] = {id, ...body};
        writeDataToFile(dataWay,  userData[index])
        return userData[index]

       } catch(err){

        return badRequest(res)
       }       
        }

    static async delete(res, id) {
        const index = await userData.findIndex((p) => p.id === id)
        if(index !== -1){
            const deletedUser = userData.filter((p) => p.id !== id);
            writeDataToFile(dataWay,  deletedUser)
            return deletedUser;
        } 
            return notFound(res)           
    }
    }


module.exports = UserService;
