const express = require('express')
const multer = require('multer') //formData形式のリクエストを扱うミドルウェア
const app = express()
const databse = require('./knex')
const cors = require('cors')
const path = require('path')

app.use(multer().none());
app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, "..", "build")));

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

//新規イベント登録用
app.post("/api/registerevent", (req, res) => {
    const eventData = req.body;
    const eventName = eventData.event_name;
    const eventNameKana = eventData.event_name_kana;

    const genre = eventData.genre;
    const address = eventData.address;
    const tel = eventData.tel;
    const email = eventData.email;
    const prefecture = eventData.prefecture;
    const city = eventData.city;
    const date = eventData.date;
    const startTime = eventData.start_time;
    const endTime = eventData.end_time;
    const description = eventData.description;
    const ownerId = eventData.owner_id;
    const img1 = eventData.img1;
    const img2 = eventData.img2;
    const img3 = eventData.img3;
    const img4 = eventData.img4;
    const img5 = eventData.img5;

    database("events").count('id').where({
        event_name:eventName,
    }).then(result => {
        if (result[0].count === '0'){
            database("events").insert({
                event_name: eventName,
                event_name_kana: eventNameKana,
                genre: genre,
                address:address,
                tel: tel,
                email:email,
                prefecture: prefecture,
                city: city,
                date: date,
                start_time: startTime,
                end_time: endTime,
                description: description,
                owner_id: ownerId,
                img1: img1,
                img2: img2,
                img3: img3,
                img4: img4,
                img5: img5
            }).then(res => console.log("success"))
        } else {
            console.log("event already registered")
        }
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });

module.exports = app; 