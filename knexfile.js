// Update with your config settings.

module.exports = {
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@127.0.0.1:5432/eventclip`,
    searchPath: "public",
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds:{
      directory: __dirname + "/seeds"
    }
}