const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/* Public Home page */
//Get route for videos
router.get('/videos', (req, res)=>{
    console.log('video route for get');
    const queryVideos = 'SELECT "id", "title", "url" FROM "videos"';
    
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

//get route for foundation
router.get('/foundation', (req, res) => {
    pool.query(`SELECT "id", "name", "bio", "url" FROM "foundation";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING foundation:', error);
            res.sendStatus(500);
    });
});

/* Public photo page*/
// get route for photos
router.get('/photos', (req, res) => {
    pool.query(`SELECT "id", "url", "description" FROM "photos";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING Photos:', error);
            res.sendStatus(500);
    });
});

/* get route for glofer */
router.get('/golfers', (req, res) => {
    pool.query(`SELECT "id", "first_name", "last_name", "bio", "purpose", "goal", "img_url" FROM "golfer";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING Golfers:', error);
            res.sendStatus(500);
    });
});

//get golfers id
router.get('/golfers/:id', (req, res)=>{
    let id = [req.params.id]
   console.log('from customer id route', id);
   const queryGolfer = `SELECT "id", "first_name", "last_name", "bio", "purpose", "goal", "img_url" FROM "golfer" where id = $1;`
   
   pool.query(queryGolfer, id).then(( results ) =>{
       res.send(results.rows);
   }).catch( (error) =>{
        console.log('Error GETTING Golfers:', error);
    res.sendStatus(500);
   })
});

module.exports = router;