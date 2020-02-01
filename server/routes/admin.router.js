const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

//GET route for event info
router.get('/event-info', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "event";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING event info:', error);
            res.sendStatus(500);
    });
});

//PUT route edit event location
router.put('/location/:id', rejectUnauthenticated, (req, res) => {
    const location = req.body.location;
    const id = req.body.id;
    const queryString = `UPDATE "event" SET "location" = $1 where id = $2;`;
    pool.query(queryString, [location, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//PUT route edit event location
router.put('/date/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const date = req.body.date;
    const id = req.body.id;
    const queryString = `UPDATE "event" SET "date" = $1 where id = $2;`;
    pool.query(queryString, [date, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//GET route for contact info
router.get('/contact-info', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "contact";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING contact:', error);
            res.sendStatus(500);
    });
});

//GET route for address info
router.get('/address-info', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "address";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING contact:', error);
            res.sendStatus(500);
    });
});




module.exports = router;
