const router = require('express').Router();
const BoardController = require('./board.controller');

router.post('/', BoardController.createBoard)
router.get('/', BoardController.getAllBoards)
router.get('/:boardId', BoardController.getBoardById)
router.put('/:boardId', BoardController.updateBoard)
router.delete('/:boardId', BoardController.deleteBoard)







module.exports = router;