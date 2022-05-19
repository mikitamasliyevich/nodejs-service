const router = require('express').Router();
const TaskController = require('./task.controller');

router.get('/:boardId/tasks', TaskController.getAllTasks)
router.post('/:boardId/tasks', TaskController.createTask)
router.get('/:boardId/tasks/:taskId', TaskController.getTaskById)
router.put('/:boardId/tasks/:taskId', TaskController.updateTask)
router.delete('/:boardId/tasks/:taskId', TaskController.deleteTask)

module.exports = router;
