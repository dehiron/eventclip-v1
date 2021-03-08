exports.up = async function(knex) {

    await knex.schema.dropTableIfExists('users')

    let now = new Date();
    let year  = now.getFullYear();
    let month = now.getMonth() + 1;
    let day   = now.getDate();
    let hour  = ( now.getHours()   < 10 ) ? '0' + now.getHours()   : now.getHours();
    let min   = ( now.getMinutes() < 10 ) ? '0' + now.getMinutes() : now.getMinutes();
    let sec   = ( now.getSeconds() < 10 ) ? '0' + now.getSeconds() : now.getSeconds();
    console.log( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec );

    await knex.schema.createTable('users', table => {
        table.increments()
        table.string('user_pref_id').notNullable();
        table.string('password').notNullable();
        table.string('user_firstname').notNullable();
        table.string('user_lastname').notNullable();
        table.string('date_of_birth');
        table.string('tel').notNullable();
        table.string('email').notNullable();
        table.timestamp('created_at').defaultTo( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec )
        table.timestamp('updated_at').defaultTo( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec )
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};