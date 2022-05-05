const router = require('express').Router();
const UserController = require('./user.controller');

router.post('/', UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUserById)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)





module.exports = router;