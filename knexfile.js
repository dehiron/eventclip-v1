// Update with your config settings.
require('dotenv').config();
// const pg = require('pg');
// pg.defaults.ssl = {
//   rejectUnauthorized: false,
// }

module.exports = {
  // development : {
    client: "pg",
    connection:
      process.env.DATABASE_URL||
      `postgres://${process.env.USER}@127.0.0.1:5432/eventclip`,
    searchPath: "public",
    ssl:{ 
      sslmode: "require",
      rejectUnauthorized: false } ,
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds:{
      directory: __dirname + "/seeds"
    },
  // },
  
  production : {
    client: "pg",
    connection:
      process.env.DATABASE_URL||
      `postgres://${process.env.USER}@127.0.0.1:5432/eventclip`,
    searchPath: "public",
    ssl:{ 
      sslmode: "require",
      rejectUnauthorized: false },
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds:{
      directory: __dirname + "/seeds"
    },
  }
}