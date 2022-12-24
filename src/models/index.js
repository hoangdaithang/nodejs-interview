
const { Model } = require('objection')
const Knex = require('knex')
const { mysql } = require('../configs/database')

const knex = Knex({
  client: 'mysql',
  connection: mysql
})
Model.knex(knex)

module.exports = Model