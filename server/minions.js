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
});

//BONUS
const workRouter = express.Router({mergeParams: true});
minR.use('/:minionId/work', workRouter);

workRouter.get('/', (req, res, next) => {
    const allWork = getAllFromDatabase('work');
    // console.log(allWork);
    const minionsWork = allWork.filter(work => work.id === req.minion.id)
    res.send(minionsWork);
});

workRouter.param('workId', (req, res, next, id) => {
    const foundWork = getFromDatabaseById('work', id);
    if (foundWork !== null && foundWork !== undefined){
        req.work = foundWork;
        if (req.work.minionId !== req.minion.id){
            res.status(400).send();
        } else {
            next();
        }
        
    } else {
        res.status(404).send();
    }
})

workRouter.put('/:workId', (req, res, next) => {
    const newWork = updateInstanceInDatabase('work', req.body);
    if (newWork !== null){
        res.send(newWork);
    } else {
        res.status(400).send();
    }
})

module.exports = minionsRouter;