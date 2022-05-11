const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { writeDataToFile } = require('../../utils/fileService');
const { badRequest, notFound } = require('../../messages/errors');

const dataWay = path.resolve("./data/boards.json")
// eslint-disable-next-line import/no-dynamic-require
const boardData = require(dataWay)



class BoardService {
    static async getAll() {
        const boards = await boardData;
        return boards;
    }

    static async create(res, board) {
        try{
            const newBoard = await { id: uuidv4(), ...board };
            boardData.push(newBoard)
            writeDataToFile(dataWay, boardData)
            return newBoard
        } catch(err){
            return badRequest(res)
        }
  
    }

    static async getOne(id) {
            const board = await boardData.find((p) => p.id === id);
            return board
  
   }

   static async update(res, body, id) {
    try{

     const index = await boardData.findIndex((p) => p.id === id);
     boardData[index] = {id, ...body};
     writeDataToFile(dataWay,  boardData[index])
     return boardData[index]

    } catch(err){

     return badRequest(res)
    }       
     }

     static async delete(res, id) {
        const index = await boardData.findIndex((p) => p.id === id)
        if(index!==-1){
             const deletedBoard = boardData.filter((p) => p.id !== id);
             res.writeHead(204, { 'Content-Type': 'application/json' });
             writeDataToFile(dataWay,  deletedBoard)
             return deletedBoard
        } 
           return  notFound(res) 
          
     }
    }


module.exports = BoardService;
