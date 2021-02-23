const express = require('express')
const multer = require('multer') //formData形式のリクエストを扱うミドルウェア
const app = express()
const databse = require('./knex')
const path = require('path')
const cors = require("cors");

app.use(multer().none());
app.use(express.json());
app.use(cors());

// Serve static assets 静的コンテンツをビルドして返す
app.use(express.static(path.resolve(__dirname, "..", "build")));

//確認用
app.get("/api", (req,res) => {
    res.send("We did it!")
})

//動くけど、API実装方法違うかもしれない。検索後にURLが変わらないことによる弊害はないか注意しておく。
//イベント情報Get用(all, filtered)
app.get("/api/events", (req,res) => {
    database("events").select().then((events) => {        
        
        if (Object.keys(req.query).length > 0) { //日付が選択された場合 or ジャンルが選択された場合
            if (Object.keys(req.query).includes("date")){ //該当する日付を持つイベントを抽出
                //filterだと効かないのでfor文使う
                const resultsFilteredByDate = [];
                for (const event of events){
                    if (event.start_date <= req.query.date && req.query.date <= event.end_date){
                        resultsFilteredByDate.push(event);
                    }
                }
                events = resultsFilteredByDate;
            } 
            if (Object.keys(req.query).includes("genre") && req.query.genre !== ""){　//該当する日付を持つイベントを抽出
                const resultsFilteredByGenre = [];
                for (const event of events){
                    for (const genre of req.query.genre.split(",")){
                        if (event.genre === genre){
                            resultsFilteredByGenre.push(event);
                        }
                    }
                }
                events = resultsFilteredByGenre;
                
            }
        }
        res.send(events);
    });
});

//新規イベント登録用
app.post("/api/event/name", (req, res) => {
    const eventData = req.body;
    const eventName = eventData.event_name;
    const eventNameKana = eventData.event_name_kana;
    const genre = eventData.genre;
    const address = eventData.address;
    const latitude = eventData.latitude;
    const longitude = eventData.longitude;
    const tel = eventData.tel;
    const email = eventData.email;
    const prefecture = eventData.prefecture;
    const city = eventData.city;
    const startDate = eventData.start_date;
    const startTime = eventData.start_time;
    const endDate = eventData.end_date;
    const endTime = eventData.end_time;
    const description = eventData.description;
    const ownerId = eventData.owner_id;
    const img1 = eventData.img1;
    const img2 = eventData.img2;
    const img3 = eventData.img3;
    const img4 = eventData.img4;
    const img5 = eventData.img5;

    database("events")
        .count('id')
        .where({
            event_name:eventName,})
        .then(result => {
                if (result[0].count === '0'){
                    database("events")
                        .insert({
                            event_name: eventName,
                            event_name_kana: eventNameKana,
                            genre: genre,
                            address:address,
                            latitude: latitude,
                            longitude: longitude,
                            tel: tel,
                            email:email,
                            prefecture: prefecture,
                            city: city,
                            start_date: startDate,
                            start_time: startTime,
                            end_date: endDate,
                            end_time: endTime,
                            description: description,
                            owner_id: ownerId,
                            img1: img1,
                            img2: img2,
                            img3: img3,
                            img4: img4,
                            img5: img5
                        })
                        .then(res => console.log("success"))
                    } else {
                        console.log("event already registered")
                    }
        })
})

//イベント更新用
app.put("/api/event/id", (req,res) => {
    try {
        database("events")
        .where({id: req.query.id})
        .update({
            event_name: eventName,
            event_name_kana: eventNameKana,
            genre: genre,
            address:address,
            latitude: latitude,
            longitude: longitude,
            tel: tel,
            email:email,
            prefecture: prefecture,
            city: city,
            start_date: startDate,
            start_time: startTime,
            end_date: endDate,
            end_time: endTime,
            description: description,
            owner_id: ownerId,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            img5: img5
        })
        .then((res => console.log(`event (id:${req.query.id}/name:${req.query.event_name}) updated`)));
    } catch(error) {
        console.log(error);
    }
});

//イベント削除用
app.delete("/api/event/id", (req,res) => {
    try {
        database("events")
        .where({id: req.query.id})
        .del()
        .then((res => console.log(`event (id:${req.query.id}/name:${req.query.event_name}) deleted`)));
    } catch(error) {
        console.log(error);
    }
});


// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
  });

module.exports = app; 