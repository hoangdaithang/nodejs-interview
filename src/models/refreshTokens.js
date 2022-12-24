const Model = require('./index')

class Refreshtoken extends Model {
  static get tableName () {
    return `Refreshtoken`
  }
}

module.exports = Refreshtoken