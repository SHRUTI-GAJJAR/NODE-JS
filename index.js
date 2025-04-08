
const express = require('express');
const app = express();
const db = require('./db');
const colors = require('colors');

const passport = require('./auth');
passport.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

//Schema's:
const Person = require('./models/Persons');
const Menu = require('./models/menu');


require('dotenv').config();
const PORT = process.env.PORT || 5000;


//Middleware:
const logRequest = (req, resp, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest); //use middleware on all routes


const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Person Routers 
const personRouters = require('./Routers/personroute');
app.use('/person',personRouters);

//Menu Routers 
const menuRouters = require('./Routers/menuroute');
app.use('/menu', menuRouters);


app.get('/cafe', (req, resp) => {
    resp.send("welcome to our cafe");
});

app.listen(5000, () => {
    console.log('listening on port 5000'.green);
})