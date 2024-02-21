const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
Get request for goals section. rejectUnauthenticated user will reject anyone
who is not the logged in user. 
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "calendar" WHERE household_id=$1`;

  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error in GET server:", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO "calendar" ("household_id","title", "date",  "start", "end", "color") 
  VALUES ($1, $2, $3, $4, $5, $6);`;

  console.log(`here is the insert for Calendar:`, req.body);

  const cBody= req.body;

  pool
    .query(queryText, [cBody.household_id, cBody.title, cBody.date, cBody.start, cBody.end, cBody.color])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Can't add to Calendar", err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added the goal
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const taskId = req.params.id;
  //   const user = req.user.id;

  const query = `
  DELETE FROM "calenar"
  WHERE "id" = $1
  AND "househole_id" = $2;
  `;

  pool
    .query(query, [req.params.id, ])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error deleteing task", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  //   const user = req.user.id;
  const task = req.body;

  const query = `

  `;

  console.log(`This is what I am updating:`, req.body);

  pool
    .query(query, [])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error updating task", err);
      res.sendStatus(500);
    });
});
module.exports = router;
