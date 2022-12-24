const Model = require('./index')

class Users extends Model {
  static get tableName () {
    return `Users`
  }
}

module.exports = Users