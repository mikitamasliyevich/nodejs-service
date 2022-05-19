const BoardService = require('./board.service');
const { successfulOperation, successfulCreated } = require('../../messages/success');
const { invalidToken, notFound } = require('../../messages/errors');


class BoardController {

    static async getAllBoards(req, res) {
        try {
         const boards = await BoardService.getAll();
         successfulOperation(res)
            return res.end(JSON.stringify(boards))
        } catch(e){
            return  invalidToken(res)
        }
    }    

    static async createBoard(req, res) {
        try{
           const newBoard = await BoardService.create(res, req.body)
           successfulCreated(res)
            return res.end(JSON.stringify(newBoard));      
        } catch(e){
            return invalidToken(res)
        }
    }

    static async getBoardById(req, res) {
        try {
     const board = await BoardService.getOne( req.params.boardId )
     if (!board) {
         return notFound(res)
     } 
        return res.json(board)
     
  } catch (e) {
         return invalidToken(res)
         }
 }

 static async updateBoard(req, res) {
    try {
        const updatedBoard = await BoardService.update(res, req.body, req.params.boardId);
         return res.json(updatedBoard);
    } catch (e) {
        return invalidToken(res)
    }
}

static async deleteBoard(req, res) {
    try {
        const deletedBoard = await BoardService.delete(res, req.params.boardId);
        return res.end(JSON.stringify(deletedBoard));
    } catch (e) {
        return invalidToken(res)
    }
}
}


module.exports = BoardController;

