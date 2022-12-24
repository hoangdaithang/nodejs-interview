import HTTPStatus from 'http-status';
import { Translator } from '../locales';

export default class Response {
    static success(res, data = null, pageInfo = undefined) {
        res.status(HTTPStatus.OK).json({
            data,
            statusCode: HTTPStatus.OK,
            pageInfo
        });
    }

    static created(res, data = null, pageInfo = undefined) {
        res.status(HTTPStatus.CREATED).json({
            data,
            statusCode: HTTPStatus.CREATED,
            pageInfo
        });
    }

    static logout(res, data = null, pageInfo = undefined) {
        res.status(HTTPStatus.CREATED).json({
            data,
            statusCode: HTTPStatus.NO_CONTENT,
            pageInfo
        });
    }

    static error(req, res, error) {
        console.log({ message: error.message, Error: error });
        const code = error.inner ? error.inner.code : error.code;
        const message = typeof error === 'string' ? error : error.message || '';
        const params = error.params || {};
        const translated = Translator.translate(message, { ...params, ns: req.ns });

        if (!error.status) {
            global.logger.error(
                Object.assign(error, {
                    req: {
                        url: req.url,
                        data: req.body
                    }
                })
            );
        }
        res.status(error.status || HTTPStatus.BAD_REQUEST).send({
            message: translated,
            errorCode: message,
            error: code,
            statusCode: error.status || HTTPStatus.BAD_REQUEST
        });
    }
}
