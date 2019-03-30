const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 3306;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'hackathon-team1-mysql.cwcltwupgir4.ap-southeast-1.rds.amazonaws.com',
    user: 'hackathonteam1',
    password: 'OJO8Sh883AkV5GhSL5s9',
    database: 'connect'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.get('/', (req, res) => {
    res.send('Hello from Connect server!')
});

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
