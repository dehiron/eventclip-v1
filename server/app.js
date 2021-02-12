const express = require('express')
const app = express()

app.use(express.json());

//確認用
app.get("/api", (req,res) => {
    res.send("We did it!")
})

module.exports = app; 