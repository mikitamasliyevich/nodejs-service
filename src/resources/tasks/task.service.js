const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { writeDataToFile } = require('../../utils/fileService');
const { badRequest, notFound } = require('../../messages/errors');

const dataWayTask = path.resolve("./data/tasks.json")
// eslint-disable-next-line import/no-dynamic-require
const taskData = require(dataWayTask)



class TaskService {
   
     static async getAll() {
        const tasks = await taskData
        return tasks;
    }  

    static async create(res, board) {
        try{
            const newTask = await {id: uuidv4(), ...board};
            taskData.push(newTask)
            writeDataToFile(dataWayTask, taskData)
            return newTask
        } catch(err){
            return badRequest(res)
        }
    }

    static async getOne(id) {
        const task = await taskData.find((p) => p.id === id);
        return task
    }

    static async update(res, body, id) {
        try{
         const index = await taskData.findIndex((p) => p.id === id);
         taskData[index] = {id, ...body};
         writeDataToFile(dataWayTask,  taskData[index])
         return taskData[index]
    
        } catch(err){
    
         return badRequest(res)
        }       
         }

         
     static async delete(res, taskId, boardId) {
        const index = await taskData.findIndex((p) => p.id === taskId && p.boardId === boardId )
        
        if(index!==-1){
             const deletedtask = taskData.filter((p) => p.id !== taskId && p.boardId !== boardId);
             res.writeHead(204, { 'Content-Type': 'application/json' });
             writeDataToFile(dataWayTask,  deletedtask)
             return deletedtask
        } 
           return  notFound(res)
          
     }

}


module.exports = TaskService;
