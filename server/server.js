const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const goalsRouter = require('./routes/goals.router');
const taskRouter = require('./routes/task.router');
const householdRouter = require('./routes/household.router');
const calendarRouter = require('./routes/calendar.router'); //Needs Household

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/household', householdRouter)
app.use('/api/calendar', calendarRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
