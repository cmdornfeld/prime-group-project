const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//Get all Videos
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

router.get('/event-info', (req, res) => {
    pool.query(`SELECT * FROM "event";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

module.exports = router;