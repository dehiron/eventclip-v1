
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()

  await knex('events').insert([
    {id:1, event_name:'花火大会', event_name_kana:'はなびたいかい', genre:'イベント', address:'東京都港区台場1-7-1', latitude:'35.6277234', longitude:'139.7735522', tel:'0335994700', email:'', prefecture:'東京都', city:'港区', date:'2021,04,24', start_time:'12:00', end_time:'14:00', description:'花火！', owner_id:'hide_owner'},
    {id:2, event_name:'しながわ水族館', event_name_kana:'水族館', genre:'スポット', address:'東京都品川区勝島3-2-1', latitude:'35.5885884', longitude:'139.7372645', tel:'0337623433', email:'', prefecture:'東京都', city:'品川区', date:'2021,05,01', start_time:'12:00', end_time:'20:00', description:'魚！', owner_id:'hide_owner'},
    {id:3, event_name:'肉フェス', event_name_kana:'にくふぇす', genre:'イベント', address:'東京都渋谷区代々木神園町2-1', latitude:'35.6716486', longitude:'139.6952259', tel:'0334854090', email:'', prefecture:'東京都', city:'渋谷区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'肉！', owner_id:'john_owner'},
    {id:4, event_name:'残念な生き物展', event_name_kana:'ざんねんないきものてん', genre:'イベント', address:'東京都豊島区東池袋3-1-1', latitude:'35.7284262', longitude:'139.7205921', tel:'0300000000', email:'', prefecture:'東京都', city:'豊島区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'残念な生き物展！', owner_id:'john_owner'},
    {id:5, event_name:'動物園', event_name_kana:'どうぶつえん', genre:'スポット', address:'東京都台東区上野公園9-83', latitude:'35.7164535', longitude:'139.7713177', tel:'0300000000', email:'', prefecture:'東京都', city:'台東区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'動物！', owner_id:'john_owner'},
    {id:6, event_name:'マンモス展', event_name_kana:'まんもすてん', genre:'イベント', address:'東京都江東区青海２丁目３−６', latitude:'35.6192557', longitude:'139.7768697', tel:'0300000000', email:'', prefecture:'東京都', city:'江東区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'マンモス！', owner_id:'john_owner'},
    {id:7, event_name:'熱海桜祭り', event_name_kana:'さくらまつり', genre:'イベント', address:'静岡県熱海市中央町８−５', latitude:'35.0959515', longitude:'139.0731584', tel:'0300000000', email:'', prefecture:'静岡県', city:'熱海市', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'桜！', owner_id:'john_owner'},
    {id:8, event_name:'マジックレストラン&バー', event_name_kana:'まじっくれすとらん&ばー', genre:'スポット', address:'東京都千代田区丸の内２丁目６−１', latitude:'35.6785703', longitude:'139.7625325', tel:'0300000000', email:'', prefecture:'東京都', city:'千代田区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'マジック！', owner_id:'john_owner'},
    {id:9, event_name:'ロックフェス', event_name_kana:'ろっくふぇす', genre:'イベント', address:'東京都江東区青海１丁目１−１０', latitude:'35.6250135', longitude:'139.7751123', tel:'0300000000', email:'', prefecture:'東京都', city:'江東区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'ロック！', owner_id:'john_owner'},
    {id:10, event_name:'猫カフェMOCHA', event_name_kana:'ねこかふぇ', genre:'スポット', address:'東京都渋谷区神南１丁目１６−３', latitude:'35.6630294', longitude:'139.6994998', tel:'0300000000', email:'', prefecture:'東京都', city:'渋谷区', date:'2021,06,20', start_time:'11:00', end_time:'17:00', description:'ぬこ！', owner_id:'john_owner'},
  ]);
};