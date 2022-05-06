const router = require('express').Router();
const BoardController = require('./board.controller');

router.post('/', BoardController.createBoard)
router.get('/', BoardController.getAllBoards)
router.get('/:id', BoardController.getBoardById)
router.put('/:id', BoardController.updateBoard)
router.delete('/:id', BoardController.deleteBoard)





module.exports = router;