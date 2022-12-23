import HTTPStatus from 'http-status';

import BaseError from './base.error';

export default class AppError {
    static Authorization(message, params = null) {
        return new BaseError(
            message,
            HTTPStatus[HTTPStatus.UNAUTHORIZED],
            HTTPStatus.UNAUTHORIZED,
            params
        );
    }

    static NotFound(message, params = null) {
        return new BaseError(
            message,
            HTTPStatus[HTTPStatus.NOT_FOUND],
            HTTPStatus.NOT_FOUND,
            params
        );
    }

    static BadRequest(message, params = null) {
        return new BaseError(
            message,
            HTTPStatus[HTTPStatus.BAD_REQUEST],
            HTTPStatus.BAD_REQUEST,
            params
        );
    }

    static Forbiden(message, params = null) {
        return new BaseError(
            message,
            HTTPStatus[HTTPStatus.FORBIDDEN],
            HTTPStatus.FORBIDDEN,
            params
        );
    }

    static BadGateway(message, params = null) {
        return new BaseError(
            message,
            HTTPStatus[HTTPStatus.BAD_GATEWAY],
            HTTPStatus.BAD_GATEWAY,
            params
        );
    }
}
