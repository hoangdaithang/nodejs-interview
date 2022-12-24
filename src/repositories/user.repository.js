import BaseRepository from './base.repository';
const Users = require('../models/users')

export default class UserRepository extends BaseRepository {
    constructor() {
        super(Users);
    }
    async getUserByEmail(email) {
        return Users.query().findOne({ email });
    }
}
