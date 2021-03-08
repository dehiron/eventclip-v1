
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  await knex('users').insert([
    {id:1, user_pref_id:"hide", password:"hidehiroaya", user_firstname:"Hidehiro", user_lastname:"Aya", date_of_birth:"1991-04-24", tel:"07000000000", email:"hi.dehiro424@gmail.com"},
    {id:2, user_pref_id:"jiro", password:"jiroyamada", user_firstname:"Jiro", user_lastname:"Yamada", date_of_birth:"1995-12-25", tel:"08000000000", email:"jiro.yamada@gmail.com"},
    {id:3, user_pref_id:"jane", password:"janedoe", user_firstname:"Jane", user_lastname:"Doe", date_of_birth:"1972-01-02",tel:"09000000000", email:"jane.doe@gmail.com"},

  ]);
};
