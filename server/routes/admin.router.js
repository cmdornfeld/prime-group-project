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

//Get all Videos
router.get('/videos', (req, res)=>{
    const queryVideos = 'SELECT "id", "url" FROM "videos"';
    pool.query(queryVideos).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT videos quert ', error);
        res.sendStatus(500);
    })
});

//POST new video
router.post('/videos', rejectUnauthenticated, (req, res) => {
    const videoUrl = req.body.videoUrl
    const queryString = `INSERT INTO "videos" ("url") VALUES ($1);`;
    pool.query(queryString, [videoUrl])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//DELETE route for deleting a video
router.delete('/videos/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "videos" WHERE "id" = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
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
