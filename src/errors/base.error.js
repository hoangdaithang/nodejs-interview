import HTTPStatus from 'http-status';

export default class BaseError extends Error {
    constructor(message, code, status = HTTPStatus.BAD_REQUEST, params = null) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.code = code;
        this.status = status;
        this.params = params;
    }
}
