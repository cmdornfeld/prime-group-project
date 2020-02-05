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

//get route admin for mission
router.get('/mission', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "id", "about" FROM "mission";`)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING Mission:', error);
            res.sendStatus(500);
    });
});

//PUT route edit mission
router.put('/mission/:id', rejectUnauthenticated, (req, res) => {
    const mission = req.body.mission;
    const id = req.body.id;
    const queryString = `UPDATE "mission" SET "about" = $1 where id = $2;`;
    pool.query(queryString, [mission, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//Get all Videos
router.get('/videos', rejectUnauthenticated, (req, res)=>{
    const queryVideos = 'SELECT "id", "url", "title" FROM "videos"';
    pool.query(queryVideos).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error from SELECT videos quert ', error);
        res.sendStatus(500);
    })
});

//Get all donations
router.get('/donation-info', (req, res)=>{
    const queryString = `SELECT "donation"."id", "donation"."first_name", "donation"."last_name", "phone_number", "email", "type", "amount", "max", "golfer_id",
                         "golfer"."first_name" firstname, "golfer"."last_name" lastname, "status"
                        FROM "donation" 
                        JOIN "golfer" ON "golfer"."id" = "donation"."golfer_id"
                        ORDER BY "donation"."id";`;
    pool.query(queryString).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error GETTING donations. Error:', error);
        res.sendStatus(500);
    })
});

//Export donation table
router.get('/donation-export', (req, res)=>{
    const queryString = `COPY (SELECT * FROM "donation") TO '/Users/chaddornfeld/Desktop/query_result.csv'
                        DELIMITER ',' CSV HEADER;`;
    pool.query(queryString).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
        console.log('Error Exporting donation table. Error:', error);
        res.sendStatus(500);
    })
});

//POST new video
router.post('/videos', rejectUnauthenticated, (req, res) => {
    const videoUrl = req.body.videoUrl
    const title = req.body.title
    const queryString = `INSERT INTO "videos" ("url", "title") VALUES ($1, $2);`;
    pool.query(queryString, [videoUrl, title])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//get route for foundation
router.get('/foundation', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "id", "name", "bio", "url" FROM "foundation";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING Mission:', error);
            res.sendStatus(500);
    });
});

//POST new foundation
router.post('/foundation', rejectUnauthenticated, (req, res) => {
    const name = req.body.title;
    const bio = req.body.bio;
    const image = req.body.image;
    const queryString = `INSERT INTO "foundation" ("name", "bio", "url") VALUES ($1, $2, $3);`;
    pool.query(queryString, [name, bio, image])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//DELETE route for deleting a video
router.delete('/foundation/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "foundation" WHERE "id" = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

//PUT route edit mission
router.put('/foundation/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const id = req.body.id;
    const title = req.body.title;
    const bio = req.body.bio;
    const url = req.body.url;
    const queryString = `UPDATE "foundation" SET "name" = $1, "bio" = $2, url = $3 where id = $4;`;
    pool.query(queryString, [title, bio, url, id])
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

//PUT route edit address
router.put('/address-info/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const fax = req.body.fax;
    const id = req.body.id;
    const queryString = `UPDATE "address" 
                        SET "street" = $1,
                            "city" = $2, 
                            "state" = $3, 
                            "zip" = $4, 
                            "phone" = $5, 
                            "fax" = $6 
                        WHERE id = $7;`;
    pool.query(queryString, [street, city, state, zip, phone, fax, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//PUT route edit contact
router.put('/contact-info/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const name = req.body.contactName;
    const email = req.body.contactEmail;
    const id = req.body.id;
    console.log(name, email, id);
    
    const queryString = `UPDATE "contact" 
                        SET "name" = $1,
                            "email" = $2
                        WHERE id = $3;`;
    pool.query(queryString, [name, email, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//PUT route edit status of payment
router.put('/donation-info/:id', rejectUnauthenticated, (req, res) => {
    console.log('logging req.body', req.body);
    let id = req.body.id;
    let status = req.body.status;
    let queryString = ``;
    if(status === 'unpaid'){
        queryString = `UPDATE "donation" SET "status" = 'paid' WHERE id = $1;`;
    } else if (status === 'paid'){
        queryString = `UPDATE "donation" SET "status" = 'unpaid' WHERE id = $1`;
    }
    pool.query(queryString, [id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

// get route for photos
router.get('/photos', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "id", "url", "description" FROM "photos";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING Photos:', error);
            res.sendStatus(500);
    });
});

//POST new photo
router.post('/photos', rejectUnauthenticated, (req, res) => {
    console.log(req.body)
    const description = req.body.description;
    const url = req.body.url;
    const queryString = `INSERT INTO "photos" ("url", "description") VALUES ($1, $2);`;
    pool.query(queryString, [url, description])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//DELETE route for deleting a photo
router.delete('/photos/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "photos" WHERE "id" = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

// GET route for golfers
router.get('/golfers', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "id", "first_name", "last_name", "bio", "purpose", "goal", "img_url" FROM "golfer";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING Golfers:', error);
            res.sendStatus(500);
    });
});

//POST new golfer
router.post('/golfers', rejectUnauthenticated, (req, res) => {
    const first = req.body.first;
    const last = req.body.last;
    const bio = req.body.bio;
    const purpose = req.body.purpose;
    const goal = req.body.goal;
    const url = req.body.url;
    const queryString = `INSERT INTO "golfer" ("first_name", "last_name", "bio", "purpose", "goal", "img_url") VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryString, [first, last, bio, purpose, goal, url])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//DELETE route for deleting a golfer
router.delete('/golfers/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "golfer" WHERE "id" = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

//GET route for individual golfer
router.get('/golfers/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    pool.query(`SELECT * FROM "golfer" WHERE id = $1;`, [id])
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING event info:', error);
            res.sendStatus(500);
    });
});

//PUT route edit name of golfer
router.put('/golfers/name/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let first = req.body.first;
    let last = req.body.last;
    let queryString = `UPDATE "golfer" SET "first_name" = $1, "last_name" = $2 where id = $3;`;
    pool.query(queryString, [first, last, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//PUT route edit goal of golfer
router.put('/golfers/goal/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let goal = req.body.goal;
    let queryString = `UPDATE "golfer" SET "goal" = $1 where id = $2;`;
    pool.query(queryString, [goal, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//PUT route edit goal of golfer
router.put('/golfers/bio/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    let bio = req.body.bio;
    let queryString = `UPDATE "golfer" SET "bio" = $1 where id = $2;`;
    pool.query(queryString, [bio, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});


module.exports = router;
