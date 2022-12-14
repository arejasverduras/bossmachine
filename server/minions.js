const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db')

const minR = minionsRouter;

minR.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minR.post('/', (req, res, next) => {
    const created = addToDatabase('minions', req.body);
    if (created !== undefined){
        res.status(201).send(created);
    } else {
        res.status(400).send();
    }
});

minR.param('minionId', (req, res, next, id) => {
    const foundMinion = getFromDatabaseById('minions', id);
    if (foundMinion !== null && foundMinion !== undefined){
        req.minion = foundMinion;
        next();
    } else {
        res.status(404).send();
    }
});

minR.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minR.put('/:minionId', (req, res, next) => {
    const updated = updateInstanceInDatabase('minions', req.body);
    if (updated !== null ){
        res.status(201).send(updated);
    } else {
        res.status(400).send();
    }
});

minR.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.minion.id);
    if (deleted){
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


module.exports = minionsRouter;