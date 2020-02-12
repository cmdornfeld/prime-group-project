require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');

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

//GET route for golfer goal total
router.get('/golfer-goal-total', (req, res) => {
    let queryString  = `SELECT SUM("goal") "total" FROM "golfer";`
    pool.query(queryString)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

//GET route for golfer donation total
router.get('/golfer-donation-total', (req, res) => {
    let queryString  = `SELECT SUM("amount") "total_received" FROM "donation";`
    pool.query(queryString)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

//GET route for partner pledge total
router.get('/partner-pledge-total', (req, res) => {
    let queryString  = `SELECT SUM("sponsor_level"."amount") "total"
                        FROM "sponsor"
                        JOIN "sponsor_level" ON "sponsor_level"."id" = "sponsor"."level";`;
    pool.query(queryString)
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

//GET route for entire goal total
router.get('/entire-goal-info', (req, res) => {
    let queryString  = `SELECT * FROM "goal";`
    pool.query(queryString)
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

//GET route for individual golfer
router.get('/golfers/:id', (req, res) => {
    const id = req.params.id;
    let queryString = `SELECT "golfer"."id", "golfer"."first_name", "golfer"."last_name", "bio", "purpose", "goal", "img_url", 
                        SUM("amount") "total"
                        FROM "golfer"
                        JOIN "donation" ON "donation"."golfer_id" = "golfer"."id"
                        WHERE "golfer"."id" = $1
                        GROUP BY "golfer"."id";`
    pool.query(queryString, [id])
        .then(results => res.send(results.rows[0]))
        .catch(error => {
            console.log('Error GETTING event info:', error);
            res.sendStatus(500);
    });
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

    //insert data
    let queryString = ``;
    if(type === 'Flat'){
        queryString = `INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "golfer_id") 
        VALUES  ($1, $2, $3, $4, $5, $6, $7 );`;
    } else if (type === 'Per Birdie' && max !== ''){
        queryString = `INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "max", "golfer_id") 
        VALUES  ($1, $2, $3, $4, $5, $6, $7, $8);`;
    } else if (type === 'Per Birdie' && max === ''){
        queryString = `INSERT INTO "donation" ("first_name", "last_name", "phone_number", "email", "type", "amount", "golfer_id") 
        VALUES  ($1, $2, $3, $4, $5, $6, $7);`;
    }
    if(type === 'Flat'){
        pool.query(queryString, [first, last, phone, email, type, amount, golfer])
        .then((result) => {
            res.sendStatus(200);
        })
        .then( () => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD
                }
              })

              const mailOptions = {
                from: `jamie.richison19@gmail.com`,
                to: `${email}`,
                subject: `Donation Comformation`,
                text: `Hello ${first},

                Thank you for your donation.  Minnesota PGA will be in contact after the 100 Holes for HOPE event to collect your pledge.`,
              }
              transporter.sendMail(mailOptions, function(err, res) {
                if (err) {
                  console.error('there was an error: ', err);
                  res.sendStatus(500);
                } else {
                  console.log('here is the res: ', res);
                  res.sendStatus(200);
                }
              })
        })
        .catch((error) => {
            console.log('Error POST PLEDGES**************', error)
            res.sendStatus(500);
        });

    } else if (type === 'Per Birdie' && max !== ''){
        pool.query(queryString, [first, last, phone, email, type, amount, max, golfer])
        .then((result) => {
            res.sendStatus(200);
        })
        .then( () => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD
                }
              })

              const mailOptions = {
                from: `jamie.richison19@gmail.com`,
                to: `${email}`,
                subject: `Donation Comformation`,
                text: `Hello ${first},

                Thank you for your donation.  Minnesota PGA will be in contact after the 100 Holes for HOPE event to collect your pledge.`,
              }
              transporter.sendMail(mailOptions, function(err, res) {
                if (err) {
                  console.error('there was an error: ', err);
                  res.sendStatus(500);
                } else {
                  console.log('here is the res: ', res);
                  res.sendStatus(200);
                }
              })
        })
        .catch((error) => {
            console.log('Error POST PLEDGES**************', error)
            res.sendStatus(500);
        });

    } else if (type === 'Per Birdie' && max === ''){
        pool.query(queryString, [first, last, phone, email, type, amount, golfer])
        .then((result) => {
            res.sendStatus(200);
        })
        .then( () => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD
                }
              })

              const mailOptions = {
                from: `jamie.richison19@gmail.com`,
                to: `${email}`,
                subject: `Donation Comformation`,
                text: `Hello ${first},

                Thank you for your donation.  Minnesota PGA will be in contact after the 100 Holes for HOPE event to collect your pledge.`,
              }
              transporter.sendMail(mailOptions, function(err, res) {
                if (err) {
                  console.error('there was an error: ', err);
                  res.sendStatus(500);
                } else {
                  console.log('here is the res: ', res);
                  res.sendStatus(200);
                }
              })
        })
        .catch((error) => {
            console.log('Error POST PLEDGES**************', error)
            res.sendStatus(500);
        });
    }
 })

 /* get route for public address */
 router.get('/address', (req, res)=>{
   const queryAddress = `SELECT "id", "street", "city", "state", "zip", "phone", "fax" FROM "address";`
   
   pool.query(queryAddress).then(( results ) =>{
       res.send(results.rows);
   }).catch( (error) =>{
        console.log('Error GETTING address:', error);
    res.sendStatus(500);
   })
});

// get route for contact public
router.get('/contact', (req, res)=>{
    const queryAddress = `SELECT "id", "name", "email" FROM "contact";`;
    
    pool.query(queryAddress).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
         console.log('Error GETTING contact:', error);
     res.sendStatus(500);
    })
 });

 // get route for email address
router.get('/email', (req, res)=>{
    const queryText = `SELECT "email" FROM "contact";`;
    pool.query(queryText).then(( results ) =>{
        res.send(results.rows);
    }).catch( (error) =>{
         console.log('Error GETTING contact:', error);
     res.sendStatus(500);
    })
 });

 router.post('/email', function(req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    const subject = req.body.subject;
    const body = req.body.body;
    let toArray = req.body.to;
    let to = [];

    toArray.forEach((element) => {
        to.push(element.email)
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    const mailOptions = {
      from: `jamie.richison19@gmail.com`,
      to: `${to}`,
      subject: `${subject}`,
      text: `Hello, 

        You have recieved an inquiry. To contact them back please email: ${name} at ${email}

        Here is their email:

        ${body}`,
    replyTo: `${email}`
    }
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
        res.sendStatus(500);
      } else {
        console.log('here is the res: ', res);
        res.sendStatus(200);
      }
    })
  })
  /* Get route for Partner */
  router.get('/sponsor', (req, res) => {
    let queryString = `SELECT "sponsor"."id", "img_url", "company" AS "name", "sponsor_level"."title", "sponsor_level"."amount", "sponsor_level"."id" "sponsor_level"
                        FROM "sponsor"
                        JOIN "sponsor_level" ON "sponsor_level"."id" = "sponsor"."level"
                        ORDER BY "sponsor_level" ASC;`;
    pool.query(queryString)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING partner info:', error);
            res.sendStatus(500);
    });
});

module.exports = router;