import BaseRepository from './base.repository';
const Tokens = require('../models/tokens')

export default class TokenRepository extends BaseRepository {
    constructor() {
        super(Tokens);
    }

    async upsert(data) {
        const token = await Tokens.query().findOne({ userId: data.userId });
        if(!token) {
            await Tokens.query().insert(data);
        }
        await Tokens.query().update(data).where({ userId: data.userId });
        return
    }
}
