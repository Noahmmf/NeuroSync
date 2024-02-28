const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
Get request for household section. rejectUnauthenticated user will reject anyone
who is not the logged in user. 
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = ` SELECT * FROM "household"
  JOIN "household_members" ON "household"."id" = "household_members"."household_id"
     WHERE
     "user_id"=$1;
 `;

  pool
    .query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error in GET server:", err);
      res.sendStatus(500);
    });
});

router.get("/names", rejectUnauthenticated, (req, res) => {
  const queryText = ` SELECT "household"."name" FROM "household";
 `;

  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error in GET server:", err);
      res.sendStatus(500);
    });
});

/**
 * POST route for /household
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
 * Delete the Household in "household" table and users in the household in "household_members" table.
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;

  const householdId = req.params.id;
  // Query to delete household members
  const deleteMembersQuery = `
    DELETE FROM "household_members"
    WHERE "user_id" = $1;
  `;

    pool
      .query(deleteMembersQuery, [userId])
      .then((result) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log("Error updating household", err);
        res.sendStatus(500);
      });
  });
// });

router.put("/update-household/:id", rejectUnauthenticated, (req, res) =>  {
  queryText =`
  UPDATE "household"
  SET 
    "name"=$1,
    "household_key"=$2
  WHERE
    "id"=$3
  `

  pool
  .query(queryText, [req.body.name, req.body.household_key, req.params.id])
  .then((result) => {

    console.log("this is the stuff,", req.body.name, req.body.household_key, req.params.id);
    res.sendStatus(204);
  })
  .catch((err) => {
    console.log("Error updating household", err);
    res.sendStatus(500);
  });
});

//Second user will be able to join a household by using the household_key the first user has made
router.post("/code", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "household"
    WHERE
     "name"= $1
    AND
    "household_key" = $2; 
    `;

  pool
    .query(queryText, [req.body.name, req.body.household_key])
    .then((result) => {
      const userId = req.user.id;
      const foundHousehold = result.rows[0];
      console.log("This is household id:", foundHousehold);

      const newHouseholdMembers = `
        INSERT INTO  "household_members"
        ("household_id", "user_id")
        VALUES
        ($1, $2);
        `;

      pool
        .query(newHouseholdMembers, [foundHousehold.id, userId])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error updating household", err);
          res.sendStatus(500);
        });
    });
});

// router.put("/:id", rejectUnauthenticated, (req, res) => {
//   const household = req.body;
//   const householdId = req.params.id;

//   const query = `
//   UPDATE "household"
//   SET 
//     "name"=$1,
//     "household_key"=$2
//   WHERE
//     "household"."id"=$3
//   `;

//   console.log(`This is what I am updating:`, req.body);

//   pool
//     .query(query, [household.name, household.household_key, householdId])
//     .then(() => {
//       removeQuery = `
//       DELETE FROM "household_members"
//       WHERE "user_id" = $1;
//       ` 
      
//       pool
//         .query(removeQuery, [req.user.id]) .then(() => {
//           newInsertQuery = `
//           INSERT INTO  "household_members"
//           ("household_id", "user_id")
//           VALUES
//           ($1, $2);
//           `

//           pool
//         .query(removeQuery, [req.user.id]).then(() => {
//       res.sendStatus(204)})
//     .catch((err) => {
//       console.log("Error updating task", err);
//       res.sendStatus(500);
//     });
//   });
// });
// });

module.exports = router;
