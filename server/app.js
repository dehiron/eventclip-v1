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

//注意：eventsとownersの順番が逆で気持ち悪いが動く
//注意：leftJoinを使うべきなのかinnerJoinを使うべきなのか
//イベント情報Get用(all, filtered)
app.get("/api/events", (req,res) => {
    database.select("*")
    .from("owners")
    .leftJoin("events","owners.id","events.owner_id")
    // .where({"owners.id":xx})
    .then((events) => {
        
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
            if (Object.keys(req.query).includes("category") && req.query.category !== ""){　//該当する日付を持つイベントを抽出
                const resultsFilteredByCategory = [];
                for (const event of events){
                    for (const category of req.query.category.split(",")){
                        if (event.category === category){
                            resultsFilteredByCategory.push(event);
                        }
                    }
                }
                events = resultsFilteredByCategory;
                
            }
            if (Object.keys(req.query).includes("id")){ //該当する[オーナー]idを持つイベントを抽出
                const resultsFilteredByDate = [];
                for (const event of events){
                    //確実なreq.query.idの方をnumber化する
                    if (event.owner_id === parseInt(req.query.id)){
                        resultsFilteredByDate.push(event);
                    }
                }
                events = resultsFilteredByDate;
            } 
            
        }
        // console.log("line50",events)
        res.send(events);
    });
});

//新規イベント登録用
app.post("/api/event/name", (req, res) => {
    const eventData = req.body;

    const eventName = eventData.event_name;
    const startDate = eventData.start_date;
    const endDate = eventData.end_date;
    const dateDetail = eventData.date_datail;
    const category = eventData.category;
    const startTime = eventData.start_time;
    const endTime = eventData.end_time;
    const timeDetail = eventData.time_datail;
    const state = eventData.state;
    const prefecture = eventData.prefecture;
    const city = eventData.city;
    const address = eventData.address;
    const latitude = eventData.latitude;
    const longitude = eventData.longitude;
    const facilityName = eventData.facility_name;
    const tel = eventData.tel;
    const description = eventData.description;
    const descriptionDetail = eventData.description_detail;
    const parkSpots = eventData.park_spots;
    const parkPrice = eventData.park_price;
    const priceDetail = eventData.price_detail;
    const creditCardInfo = eventData.credit_card_info;
    const ownerId = eventData.owner_id;
    const tag = eventData.owner_tag;
    const img1 = eventData.img1;
    const img2 = eventData.img2;
    const img3 = eventData.img3;
    const img4 = eventData.img4;
    const img5 = eventData.img5;
    const linkToHp = eventData.link_to_hp;

    database("events")
        .count('id')
        .where({
            event_name:eventName})
        .then(result => {
                if (result[0].count === '0'){
                    database("events")
                        .insert({
                            event_name: eventName,
                            start_date: startDate,
                            end_date: endDate,
                            date_detail: dateDetail,
                            category: category,
                            start_time: startTime,
                            end_time: endTime,
                            time_detail: timeDetail,
                            state: state,
                            prefecture: prefecture,
                            city: city,
                            address: address,
                            latitude: latitude,
                            longitude: longitude,
                            facility_name: facilityName,
                            tel: tel,
                            description: description,
                            description_detail: descriptionDetail,
                            park_spots: parkSpots,
                            park_price: parkPrice,
                            price_detail: priceDetail,
                            credit_card_info: creditCardInfo,
                            owner_id: ownerId,
                            tag: tag,
                            img1: img1,
                            img2: img2,
                            img3: img3,
                            img4: img4,
                            img5: img5,
                            link_to_hp: linkToHp,
                            created_at: new Date(),
                            updated_at: new Date(),
                        })
                        .then(res => console.log("success"))
                    } else {
                        console.log("event already registered")
                    }
        })
})

//新規オーナー登録用
app.post("/api/owner/register", (req, res) => {
    const ownerData = req.body;

    const ownerFirstName = ownerData.owner_firstname;
    const ownerLastName = ownerData.owner_lastname;
    const ownerTel = ownerData.tel;
    const ownerEmail = ownerData.email;
    const ownerPrefId = ownerData.owner_pref_id;
    const ownerPassword = ownerData.password;
    const dateOfBirth = ownerData.date_of_birth;
    const organization = ownerData.organization;

    database("owners")
        .count('id')
        .where({
            owner_pref_id:ownerPrefId})
        .then(
            result => {
                if (result[0].count === '0'){
                    database("owners")
                        .insert({
                            owner_firstname: ownerFirstName,
                            owner_lastname: ownerLastName,
                            tel: ownerTel,
                            email: ownerEmail,
                            owner_pref_id: ownerPrefId,
                            password: ownerPassword,
                            date_of_birth: dateOfBirth,
                            organization: organization,
                            created_at: new Date() ,
                            updated_at: new Date() ,
                        })
                        .then(res => {
                            console.log(`success! owner_id:${ownerPrefId} is created`)
                        })
                    } else {
                        console.log("owner already exists")
                    }
        })
})

//オーナーログイン認証確認用
app.post("/api/owner/login", (req, res) => {
    const ownerData = req.body;

    const inputOwnerPrefId = ownerData.input_owner_pref_id;
    const inputPassword = ownerData.input_password;

    const accountCounter = [];

    async function confirmAuth(id,pass){
        await database("owners")
        .count('id')
        .where({owner_pref_id:id})
        .then(result => {
            // result は [ { count: '1' } ]
            accountCounter.push(result[0].count);
        });

        if (parseFloat(accountCounter[0]) > 0){ //ユーザー数が１以上＝ユーザーが存在していた場合
            database("owners")
            .select()
            .where({owner_pref_id:id})
            .then(result => {
                if (result[0].password === pass){
                    res.send(result[0]);
                } else {
                    //パスワード間違った場合
                    res.sendStatus(401)
                    // express deprecated res.send(status, body): Use res.status(status).send(body) instead
                }
            })
        } else {
            //存在しないユーザーの場合
            res.sendStatus(204);
        }

    };

    confirmAuth(inputOwnerPrefId,inputPassword)

        
})

//イベント更新用
app.put("/api/event/id", (req,res) => {
    try {
        database("events")
        .where({id: req.query.id})
        .update({
            event_name: eventName,
            start_date: startDate,
            end_date: endDate,
            date_detail: dateDetail,
            category: category,
            start_time: startTime,
            end_time: endTime,
            time_detail: timeDetail,
            state: state,
            prefecture: prefecture,
            city: city,
            address: address,
            latitude: latitude,
            longitude: longitude,
            facility_name: facilityName,
            tel: tel,
            description: description,
            description_detail: descriptionDetail,
            park_spots: parkSpots,
            park_price: parkPrice,
            price_detail: priceDetail,
            credit_card_info: creditCardInfo,
            owner_id: ownerId,
            tag: tag,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            img5: img5,
            link_to_hp: linkToHp
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