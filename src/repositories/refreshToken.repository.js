import BaseRepository from './base.repository';
const Refreshtoken = require('../models/refreshTokens')

export default class RefreshTokenRepository extends BaseRepository {
    constructor() {
        super(Refreshtoken);
    }
}
