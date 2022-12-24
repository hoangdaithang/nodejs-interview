const Model = require('./index')

class Tokens extends Model {
  static get tableName () {
    return `Tokens`
  }
}

module.exports = Tokens