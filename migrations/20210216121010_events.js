exports.up = async function(knex) {

    await knex.schema.dropTableIfExists('events')

    let now = new Date();
    let year  = now.getFullYear();
    let month = now.getMonth() + 1;
    let day   = now.getDate();
    let hour  = ( now.getHours()   < 10 ) ? '0' + now.getHours()   : now.getHours();
    let min   = ( now.getMinutes() < 10 ) ? '0' + now.getMinutes() : now.getMinutes();
    let sec   = ( now.getSeconds() < 10 ) ? '0' + now.getSeconds() : now.getSeconds();
    console.log( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec );

    await knex.schema.createTable('events', table => {
        table.increments()
        table.string('event_name').notNullable();
        table.string('event_name_kana').notNullable();
        table.string('genre').notNullable();
        table.string('address').notNullable();
        table.decimal('latitude', [16], [8]);
        table.decimal('longitude', [16], [8]);
        table.string('tel').notNullable();
        table.string('email')
        table.string('prefecture').notNullable();
        table.string('city').notNullable();
        table.string('date').notNullable().defaultTo('19000101');
        table.string('start_time').defaultTo('00:00');
        table.string('end_time').defaultTo('00:00');
        table.text('description')
        table.string('owner_id').notNullable();
        table.string('img1').notNullable().defaultTo('https:dl.dropboxusercontent.com/s/t1u9z09klzlfm33/garden2.jpg')
        table.string('img2').notNullable().defaultTo('https:dl.dropboxusercontent.com/s/nq75n7md589rpfs/noimage.png')
        table.string('img3').notNullable().defaultTo('https:dl.dropboxusercontent.com/s/nq75n7md589rpfs/noimage.png')
        table.string('img4').notNullable().defaultTo('https:dl.dropboxusercontent.com/s/nq75n7md589rpfs/noimage.png')
        table.string('img5').notNullable().defaultTo('https:dl.dropboxusercontent.com/s/nq75n7md589rpfs/noimage.png')
        table.timestamp('created_at').defaultTo( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec )
        table.timestamp('updated_at').defaultTo( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec )
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('events')
};