import { Response } from '../utils';
import { AppError } from '../errors';
// eslint-disable-next-line
export default (req, res, next) => Response.error(req, res, AppError.NotFound('PAGE_NOT_FOUND'));
