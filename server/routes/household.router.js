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
  const queryText = "";

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
  const userId = req.user.id;

  const insertHouseholdName = `
    INSERT INTO "household"
    ("name", "household_key")
    VALUES
    ($1, $2)
    RETURNING "id";
    `;
  const householdName = [req.body.name, req.body.household_key];

  pool.query(insertHouseholdName, householdName).then((result) => {
    const createdHouseholdId = result.rows[0].id;

    console.log("new Household is:", createdHouseholdId);

    const newHouseholdMembers = `
    INSERT INTO  "household_members"
    ("household_id", "user_id")
    VALUES
    ($1, $2);
    `;

    pool
      .query(newHouseholdMembers, [createdHouseholdId, userId])
      .then((result) => {
        //Displays whats being sent back

        res.sendStatus(201);
      })
      .catch((err) => {
        // catch for second query
        console.log(err);
        res.sendStatus(500);
      });
  });
});

/**
 * Delete an item if it's something the logged in user added the goal
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const taskId = req.params.id;
  //   const user = req.user.id;

  const query = `

  `;

  pool
    .query(query, [])
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

router.post("/code", rejectUnauthenticated, (req, res) => {
    const queryText= `
    SELECT * FROM "household"
    WHERE
     "name"= $1
    AND
    "household_key" = $2; 
    `;

    pool.query(queryText, [req.body.name, req.body.household_key])
    .then(result => {
        const userId = req.user.id;
        const foundHousehold = result.rows[0];
        console.log('This is household id:', foundHousehold);

        const newHouseholdMembers = `
        INSERT INTO  "household_members"
        ("household_id", "user_id")
        VALUES
        ($1, $2);
        `;

        pool.query(newHouseholdMembers, [foundHousehold.id, userId])
        .then(result => {
            res.sendStatus(200);

        }).catch((err) => {
            console.log("Error updating household", err);
            res.sendStatus(500);
          });
    })
})

module.exports = router;
