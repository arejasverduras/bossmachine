const e = require('express');
const express = require('express');
const ideasRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const iR = ideasRouter;

iR.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

iR.post('/', checkMillionDollarIdea, (req, res, next) => {
    const createdIdea = addToDatabase('ideas', req.body);
    if (createdIdea!== undefined){
        res.status(201).send(createdIdea);
    } else {
        res.status(400).send();
    }
});

iR.param('ideaId', (req, res, next, id) => {
    const foundIdea = getFromDatabaseById('ideas', id);
    if (foundIdea !== null && foundIdea !== undefined){
        req.idea = foundIdea;
        next();
    } else {
        res.status(404).send();
    }
});

iR.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

iR.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea !== null){
        res.status(201).send(updatedIdea);
    } else {
        res.status(400).send();
    }
});

iR.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (deleted){
        res.status(204).send();
    } else {
        res.status(500).send();
    }
})

module.exports = ideasRouter;