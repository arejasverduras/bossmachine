const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,} = require('./db')

const minR = minionsRouter;

minR.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
})



module.exports = minionsRouter;