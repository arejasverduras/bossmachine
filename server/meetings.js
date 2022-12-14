const express = require('express');
const meetingsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
    createMeeting
    } = require('./db');


mR = meetingsRouter;

mR.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

mR.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    const addedMeeting = addToDatabase('meetings', newMeeting);
    if (addedMeeting !== undefined)
        {
            res.status(201).send(addedMeeting);
        } else {
            res.status(400).send();
        }
});

mR.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'));
})
module.exports = meetingsRouter;