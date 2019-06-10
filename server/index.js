const express = require('express');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const authController = require('./controllers/authController');

const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
}))




app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${ SERVER_PORT }`)
})