export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.query().select('*');
    }

    async create(data, options) {
        return await this.model.query().insert(data, options);
    }

    async delete(data) {
        return await this.model.query().where(data).del()
    }
}
