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
  const queryText = 'SELECT * FROM "task" WHERE user_id=$1 ORDER BY id DESC;';

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
  const user = req.user.id;
  const queryText = `INSERT INTO "task" ("user_id", "task_details", "is_complete")
  VALUES ($1 , $2 , $3);`;

  console.log(
    `here is the insert for task:`,
    user,
    req.body.task_details,
    req.body.is_complete
  );

  pool
    .query(queryText, [user, req.body.task_details, req.body.is_complete])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Can't add to goals", err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added the goal
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const taskId = req.params.id;
  const user = req.user.id;

  const query = `
  DELETE FROM "task"
  WHERE "id" = $1
  AND "user_id" = $2;
  `;

  pool
    .query(query, [taskId, user])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error deleteing task", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const task = req.body;
  const taskId = req.params.id;

  const query = `
  UPDATE "task"
  SET 
    "task_details"=$1,
    "is_complete"=$2
  WHERE
    "id"=$3
  `;

  console.log(`This is what I am updating:`, req.body);

  pool
    .query(query, [task.task_details, task.is_complete, taskId])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error updating task", err);
      res.sendStatus(500);
    });
});
module.exports = router;
