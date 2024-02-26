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
// const household= req.body;
const user= req.user.id;


  const queryText = `SELECT  "household_members".*, "household".*, jsonb_agg("calendar") AS "calendar" FROM "household_members"
  JOIN "household" ON "household_members"."household_id" = "household"."id"
  JOIN "calendar" ON "household"."id" = "calendar"."cal_household_id" 
  WHERE "household_id" = (SELECT "household_id" FROM "household_members"
  WHERE "user_id"=$1)
  GROUP BY "household_members"."user_id", "household_members"."household_id", "household"."id";`;

  console.log(`USER ID IS :`, user);

  pool
    .query(queryText, [user])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error in GET server:", err);
      res.sendStatus(500);
    });
});

router.get("/event", rejectUnauthenticated, (req, res) => {
  // const household= req.body;
  const user= req.user.id;
  const eventId = req.body.id;
  
    const queryText = `SELECT  "household_members".*, "household".*, jsonb_agg("calendar") AS "calendar" FROM "household_members"
    JOIN "household" ON "household_members"."household_id" = "household"."id"
    JOIN "calendar" ON "household"."id" = "calendar"."cal_household_id" 
    WHERE "household_id" = (SELECT "household_id" FROM "household_members"
    WHERE "user_id"=$1) AND "calendar"."id"=$2
    GROUP BY "household_members"."user_id", "household_members"."household_id", "household"."id";`;
  
    console.log(`USER ID IS :`, user, `and event ID is `, req.params.id);
  
    pool
      .query(queryText, [user, req.body.id])
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
  const queryText = `INSERT INTO "calendar" ("allDay", "cal_household_id","title", "date",  "start", "end", "color") 
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  console.log(`here is the insert for Calendar:`, req.body);

  const cBody= req.body;


  pool
    .query(queryText, [cBody.allDay, cBody.cal_household_id, cBody.title, cBody.date, cBody.start, cBody.end, cBody.color])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Can't add to Calendar", err);
      res.sendStatus(500);
    });
});

/**
 * Deleting an event tied to id and household_id
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const eventId = req.params.id;
  //   const user = req.user.id;

  const query = `
  DELETE FROM "calendar"
  WHERE "id" = $1
  `;
 pool.query(query, [eventId])
    .then(() => {
      res.sendStatus(204)})
    .catch((err) => {
      console.log("Error deleteing event", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {

  const cal = req.body;

  const query = `
  UPDATE "calendar"
  SET 
  "allDay"=$1,
  "date"=$2,
  "title"=$3,
  "start"=$4,
  "end"=$5,
  "color"=$6
  WHERE "id" = $7
  `;

  console.log(`This is what I am updating:`, cal);

  pool
    .query(query, [cal.allDay, cal.date, cal.title, cal.start, cal.end, cal.color, req.params.id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error updating task", err);
      res.sendStatus(500);
    });
});
module.exports = router;
