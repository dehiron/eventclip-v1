
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('events').del()

  await knex('events').insert([
    {id:1, event_name:'花火大会', event_name_kana:'はなびたいかい', genre:'イベント', address:'東京都港区台場1-7-1', tel:'0335994700', email:'', prefecture:'東京都', city:'港区', date:new Date(2021,04,24), start_time:new Date(2021,04,24,12,00), end_time:new Date(2021,04,24,14,00), description:'花火！', owner_id:'hide_owner'},
    {id:2, event_name:'水族館', event_name_kana:'すいぞくかん', genre:'スポット', address:'東京都品川区勝島3-2-1', tel:'0337623433', email:'', prefecture:'東京都', city:'品川区', date:new Date(2021,05,01), start_time:new Date(2021,05,01,12,00), end_time:new Date(2021,05,01,20,00), description:'魚！', owner_id:'hide_owner'},
    {id:3, event_name:'肉フェス', event_name_kana:'にくふぇす', genre:'イベント', address:'東京都渋谷区代々木神園町2-1', tel:'0334854090', email:'', prefecture:'東京都', city:'渋谷区', date:new Date(2021,6,20), start_time:new Date(2021,06,20,11,00), end_time:new Date(2021,06,20,17,00), description:'肉！', owner_id:'john_owner'}
  ]);
};