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
  const queryText = 'SELECT * FROM "goals" WHERE user_id=$1';

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
  const user = req.user.id;
  const queryText = `INSERT INTO "goals" ("user_id", "type", "description")
  VALUES ($1 , $2 , $3);`;

  console.log(`here is the insert for goals:`, user, req.body.type, req.body.description);

  pool.query(queryText, [user, req.body.type, req.body.description])
  .then(() => res.sendStatus(201))
  .catch((err) => {
    console.log("Can't add to goals", err);
    res.sendStatus(500);
  });
});

/**
 * Delete an item if it's something the logged in user added the goal
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const goalId = req.params.id;
  const user = req.user.id;

  const query = `
  DELETE FROM "goals"
  WHERE "id" = $1
  AND "user_id" = $2;
  `

  pool
  .query(query, [goalId, user])
  .then(() => res.sendStatus(204))
  .catch((err) => { console.log("Error deleteing goal", err);
  res.sendStatus(500);
})
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const user = req.user.id;
  const goal = req.body

  const query = `
  UPDATE "goals"
  SET 
    "type"=$1,
    "description"=$2,
    "is_complete"=$3
  WHERE
    "id"=$4
    AND
    "user_id"= $5;
  `;

    console.log(`This is what I am updating:`, req.body);

  pool
  .query(query, [goal.type, goal.description, goal.is_complete, req.params.id, user])
  .then(() => res.sendStatus(204))
  .catch((err) => { console.log("Error updating goal", err);
  res.sendStatus(500);
})
});
module.exports = router;
