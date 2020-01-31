const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//Get all customer
router.get('/', (req, res)=>{
    console.log('video route for get');
    const queryVideos = 'SELECT "id", "url" FROM "video"';
    
    pool.query(queryVideos).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT videos quert ', error);
        res.sendStatus(500);
    })
});

module.exports = router;