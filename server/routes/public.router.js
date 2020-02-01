const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/* Public Home page */
//Get route for videos
router.get('/videos', (req, res)=>{
    console.log('video route for get');
    const queryVideos = 'SELECT "id", "url" FROM "videos"';
    
    pool.query(queryVideos).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT videos quert ', error);
        res.sendStatus(500);
    })
});

//get route for event
router.get('/event-info', (req, res) => {
    pool.query(`SELECT * FROM "event";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

/* Public About Page */
//get route public for mission
router.get('/mission', (req, res) => {
    pool.query(`SELECT "id", "about" FROM "mission";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING Mission:', error);
            res.sendStatus(500);
    });
});

module.exports = router;