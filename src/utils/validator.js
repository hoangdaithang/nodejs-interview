import { body, check, validationResult, checkSchema } from 'express-validator';
import { AppError } from '../errors';
import { Translator } from '../locales';

export default class Validator {
    static check = check;

    static body = body;

    static checkSchema = checkSchema;

    static validate(req, res, next) {
        const errors = validationResult(req).array();
        if (errors.length === 0) {
            return next();
        }
        const extractedErrors = errors.map(err => {
            return Translator.translate(err.msg, { object: err.param, ns: req.ns });
        });
        next(AppError.BadRequest(extractedErrors.join(', ')));
    }
}
