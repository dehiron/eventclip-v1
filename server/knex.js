knex = require('knex')
config = require('../knexfile')
database = knex(config)

module.exports = database; 