const TaskService = require('./task.service');
const { successfulOperation, successfulCreated } = require('../../messages/success');
const { invalidToken, notFound } = require('../../messages/errors');


class TaskController {

static async getAllTasks(req, res) {
    try {
     const tasks = await TaskService.getAll();
     successfulOperation(res)
    return res.end(JSON.stringify(tasks))
    } catch(e){
        return  invalidToken(res)
    }
} 

static async createTask(req, res) {
    try{
        const {title, order, description, userId, columnId} = req.body
        const task = {
            title,
            order,
            description,
            userId,
            boardId: req.params.boardId,
            columnId,
        }
        const newTask = await TaskService.create(res, task,  req.params.boardId)
        successfulCreated(res)
         return res.end(JSON.stringify(newTask));      
     } catch(e){
         return invalidToken(res)
     }
} 

static async getTaskById(req, res) {
    try {
 const task = await TaskService.getOne( req.params.taskId )
 if (!task) {
     return notFound(res)
 } 
    return res.json(task)
 
} catch (e) {
     return invalidToken(res)
     }
}

static async updateTask(req, res) {
    try {
        const updatedTask = await TaskService.update(res, req.body, req.params.taskId);
         return res.json(updatedTask);
    } catch (e) {
        return invalidToken(res)
    }
}

static async deleteTask(req, res) {
    try {
        const deletedTask = await TaskService.delete(res, req.params.taskId, req.params.boardId);
        return res.end(JSON.stringify(deletedTask));
    } catch (e) {
        return invalidToken(res)
    }
}

}


module.exports = TaskController;

