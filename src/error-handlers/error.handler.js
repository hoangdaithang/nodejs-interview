import { Response } from '../utils';
// eslint-disable-next-line
export default (error, req, res, next) => Response.error(req, res, error);
