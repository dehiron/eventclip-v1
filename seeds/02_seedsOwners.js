
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('owners').del()

  await knex('owners').insert([
    {id:1, owner_id:"hide", password:"hidehiroaya", owner_name:"Hidehiro Aya", date_of_birth:"19910424", tel:"07000000000", email:"hi.dehiro424@gmail.com", organization:"個人"},
    {id:2, owner_id:"taro", password:"tarotanaka", owner_name:"Taro Tanaka ", date_of_birth:"19951224", tel:"08000000000", email:"taro.tanaka@gmail.com", organization:"taro-production"},
    {id:3, owner_id:"john", password:"johndoe", owner_name:"John Doe", date_of_birth:"19720101",tel:"09000000000", email:"johndoe@gmail.com", organization:"ジョンプロ"},

  ]);
};
