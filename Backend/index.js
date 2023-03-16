const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// Your code here

// Connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
});

app.get('/', (req, res) => {
    // select all comments
    connection.query("SELECT * FROM comments", function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
});

app.post('/', (req, res) => {
    // extrage variabilele "text", "tip", si "id_parinte" din body-ul request-ului, care este sub forma unui JSON
    body = req.body;
    text = body.text;
    tip = body.tip;
    id_parinte = body.id_parinte;

    // "INSERT INTO comments (text, tip, id_parinte) VALUES ('test', 'contra', 1)"
    sql = "INSERT INTO comments (text, tip, id_parinte) VALUES ('" + text + "', '" + tip + "', " + id_parinte + ")";

    // insert a new line in comments table with text: 'test', tip: 'contra', id_parinte: 1
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "result": "OK" }));

});

app.listen(port, () => {
    console.log('Server started on port 3000');
});
