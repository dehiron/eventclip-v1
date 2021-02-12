const express = require('express')
const app = express()
const databse = require('./knex')

app.use(express.json());

//確認用
app.get("/api", (req,res) => {
    res.send("We did it!")
})

//all
app.get("/api/events", (req,res) => {
    database("events").select().then((result) => {
        res.send(result);
    });
});


module.exports = app; 