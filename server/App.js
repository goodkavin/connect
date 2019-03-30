const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const SELECT_ALL_PWD_QUERY = 'SELECT * FROM source LIMIT 100';
const SELECT_ALL_NAME_QUERY = 'SELECT name FROM source LIMIT 100';

// const {getHomePage} = require('./routes/index');
// const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

/*-------------------------- all pwd -------------------------*/
app.get('/pwd', (req, res) =>{
	db.query(SELECT_ALL_PWD_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

app.get('/name', (req, res) =>{
	db.query(SELECT_ALL_NAME_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

/*--------------------- search id ------------------------*/
app.get('/id/:id', (req, res) =>{
	var id = req.params.id;
	const SEARCH_BY_ID_QUERY = 'SELECT name, id FROM `connect`.source WHERE id LIKE "'+ id +'%"'
	db.query(SEARCH_BY_ID_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

/*----------------- publish story ------------------------*/
app.get('/publish/:id', (req, res) =>{
	var id = req.params.id;
	const UPDATE_PUBLISHED_QUERY = 'UPDATE `connect`.source SET published=1 WHERE id="'+ id +'"'
	db.query(UPDATE_PUBLISHED_QUERY, (err,results) =>{
		if (err) {
			return res.send(err)
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
