const router = require('express').Router();
const UserController = require('./user.controller');

router.post('/', UserController.createUser)
router.get('/', UserController.getAllUsers)
router.get('/:userId', UserController.getUserById)
router.put('/:userId', UserController.updateUser)
router.delete('/:userId', UserController.deleteUser)





module.exports = router;