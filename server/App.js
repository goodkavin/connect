const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const SELECT_ALL_PWD_QUERY = 'SELECT * FROM source LIMIT 100';
const SELECT_ALL_NAME_QUERY = 'SELECT name FROM source LIMIT 100';
const SELECT_ALL_AGE_QUERY = 'SELECT age FROM source LIMIT 100';

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

/*-------------------------- pwd --------------------------*/
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

//get all PWDs' name
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

//get all PWDs' age
app.get('/age', (req, res) =>{
	db.query(SELECT_ALL_AGE_QUERY, (err,results) =>{
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

//get all PWDs' name from specific company
app.get('/a/:company_name', (req, res) =>{
    var company_name = req.params.company_name;
    const SELECT_PWD_FROM_SPECIFIC_COMPANY_QUERY = 'SELECT name FROM source WHERE company="'+company_name+'"'
	db.query(SELECT_PWD_FROM_SPECIFIC_COMPANY_QUERY, (err,results) =>{
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

//get all PWDs' information from PWDs' name
app.get('/:pwd_name/info', (req, res) =>{
    var pwd_name = req.params.pwd_name;
    const SELECT_PWD_FROM_SPECIFIC_COMPANY_QUERY = 'SELECT age,job_role,job_type,agency,company FROM source WHERE name="'+pwd_name+'"'
	db.query(SELECT_PWD_FROM_SPECIFIC_COMPANY_QUERY, (err,results) =>{
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
