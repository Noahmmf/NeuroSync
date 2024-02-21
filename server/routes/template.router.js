const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
Get request for goals section. rejectUnauthenticated user will reject anyone
who is not the logged in user. 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = '';

  pool.query(queryText, [req.user.id])
  .then((result) => res.send(result.rows))
  .catch((err) => {
    console.log('Error in GET server:', err);
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = ``;

  console.log(`here is the insert for Calendar:`);

  pool.query(queryText, [])
  .then(() => res.sendStatus(201))
  .catch((err) => {
    console.log("Can't add to Calendar", err);
    res.sendStatus(500);
  });
});

/**
 * Delete an item if it's something the logged in user added the goal
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const taskId = req.params.id;
//   const user = req.user.id;

  const query = `

  `

  pool
  .query(query, [])
  .then(() => res.sendStatus(204))
  .catch((err) => { console.log("Error deleteing task", err);
  res.sendStatus(500);
})
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
//   const user = req.user.id;
  const task = req.body

  const query = `

  `;

    console.log(`This is what I am updating:`, req.body);

  pool
  .query(query, [])
  .then(() => res.sendStatus(204))
  .catch((err) => { console.log("Error updating task", err);
  res.sendStatus(500);
})
});
module.exports = router;
