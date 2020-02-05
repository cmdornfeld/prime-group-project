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
   const queryGolfer = `SELECT "id", "first_name" firstname, "last_name" lastname, "bio", "purpose", "goal", "img_url" FROM "golfer" where id = $1;`
   
   pool.query(queryGolfer, id).then(( results ) =>{
       res.send(results.rows);
   }).catch( (error) =>{
        console.log('Error GETTING Golfers:', error);
    res.sendStatus(500);
   })
});

/* Post route for Pledges */
router.post( '/pledges', (req, res) => {
    const first = req.body.first_name;
    const last = req.body.last_name;
    const phone = req.body.phone_number;
    const email = req.body.email;
    const type = req.body.type;
    const amount = req.body.amount;
    const max = req.body.max;
    const golfer = req.body.golfer_id;

    console.log('req.body', req.body);
    //insert data
    let queryString = ``;
    if(type === 'Flat'){
        queryString = `INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "golfer_id") 
        VALUES  ($1, $2, $3, $4, $5, $6, $7 );`;
    } else if (type === 'Per Birdie'){
        queryString = `INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "max", "golfer_id") 
        VALUES  ($1, $2, $3, $4, $5, $6, $7, $8);`;
    }
    // const queryText = `INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "max", "golfer_id") 
    //                     VALUES  ($1, $2, $3, $4, $5, $6, $7, $8);`;

    if(type === 'Flat'){
        pool.query(queryString, [first, last, phone, email, type, amount, golfer])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error POST PLEDGES**************', error)
            res.sendStatus(500);
        });

    } else {
        pool.query(queryString, [first, last, phone, email, type, amount, max, golfer])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error POST PLEDGES**************', error)
            res.sendStatus(500);
        });
    }
 })

module.exports = router;