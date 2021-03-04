
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('owners').del()

  await knex('owners').insert([
    {id:1, owner_pref_id:"hide", password:"hidehiroaya", owner_firstname:"Hidehiro", owner_lastname:"Aya", date_of_birth:"1991-04-24", tel:"07000000000", email:"hi.dehiro424@gmail.com"},
    {id:2, owner_pref_id:"taro", password:"tarotanaka", owner_firstname:"Taro", owner_lastname:"Tanaka", date_of_birth:"1995-12-24", tel:"08000000000", email:"taro.tanaka@gmail.com", organization:"taro-production"},
    {id:3, owner_pref_id:"john", password:"johndoe", owner_firstname:"John", owner_lastname:"Doe", date_of_birth:"1972-01-01",tel:"09000000000", email:"johndoe@gmail.com", organization:"ジョンプロ"},

  ]);
};
