import { JwtUtils } from '../utils';
import { AppError } from '../errors';
export default class AuthController {
    constructor(opts) {
        this.authService = opts.authService;
        this.userService = opts.userService;
    };

    isAuth = async (req, res, next) => {
        const token = JwtUtils.getToken(req);
        if (!token) {
            return next && next(AppError.Authorization('AUTHORIZATION_ERROR'));
        }
        try {
            const user = await this.verifyUser(token);
            req.user = user;
            next && next();
        } catch (e) {
            console.log({ message: e.message, e });
            next && next(AppError.Authorization('AUTHORIZATION_ERROR'));
        }
    };

    verifyUser = async (token) => {
        let userId = null;
        try {
            const data = await JwtUtils.verifyToken(token, true);
            userId = data.id;
        } catch (e) {
            throw AppError.Authorization('AUTHORIZATION_ERROR');
        }
        const user = await this.userService.getUserById(userId);
        try {
            await JwtUtils.verifyToken(token);
        } catch (e) {
            throw AppError.Authorization('AUTHORIZATION_ERROR');
        }
        if (!user) {
            throw AppError.NotFound('USER_NOT_FOUND');
        }
        if (user.blockedAt) {
            throw AppError.BadRequest('USER_BLOCKED');
        }
        return user;
    };

    userSignup = async ({body, ns }) => {
        const response = await this.authService.userSignup(body,ns);
        return response;
    };
}