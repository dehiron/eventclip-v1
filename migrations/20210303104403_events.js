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
        table.string('start_date').notNullable().defaultTo('1900/01/01');;
        table.string('end_date').defaultTo('1900/01/01');
        table.text('date_detail').defaultTo('1900/01/01');
        table.string('category').notNullable();
        table.string('start_time').defaultTo('00:00');
        table.string('end_time').defaultTo('00:00');
        table.text('time_detail').defaultTo('1900/01/01');
        table.string('state').notNullable();
        table.string('prefecture').notNullable();
        table.string('city').notNullable();
        table.string('address').notNullable();
        table.decimal('latitude', [16], [8]);
        table.decimal('longitude', [16], [8]);
        table.string('facility_name').notNullable();
        table.string('tel').notNullable();
        table.text('description').notNullable();
        table.text('description_detail').notNullable();
        table.string('park_spots').notNullable();;
        table.text('park_price');
        table.text('price_detail');
        table.string('credit_card_info');
        table.integer('owner_id').references('id').inTable('owners'); //ownersテーブルの[owner_id]ではなく[id]を参照しているので注意。
        table.specificType('tag','text Array');
        table.string('img1').notNullable().defaultTo('https://eventclip.s3-ap-northeast-1.amazonaws.com/garden2.jpg')
        table.string('img2').notNullable().defaultTo('https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png')
        table.string('img3').notNullable().defaultTo('https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png')
        table.string('img4').notNullable().defaultTo('https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png')
        table.string('img5').notNullable().defaultTo('https://eventclip.s3-ap-northeast-1.amazonaws.com/noimage.png')
        table.string('link_to_hp');
        table.timestamp('created_at').defaultTo( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec )
        table.timestamp('updated_at').defaultTo( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec )
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('events')
};