import { AppError } from '../errors';
import { BcryptUtils, ObjectUtils, JwtUtils } from '../utils'
import Moment from 'moment';

export default class AuthService {
    constructor(opts) {
        this.userRepository = opts.userRepository;
        this.tokenRepository = opts.tokenRepository;
        this.refreshTokenRepository = opts.refreshTokenRepository
    }

    async userSignup(body) {
        const { email, password, firstName, lastName } = body;
        let user = await this.userRepository.getUserByEmail(email);
        if (user) {
            throw AppError.BadRequest('EMAIL_EXIST');
        }
        const userSignup = {
            email,
            firstName,
            lastName,
            password: await BcryptUtils.hash(password, 8)
        }
        try {
            user = await this.userRepository.create(userSignup);
        } catch (error) {
            throw AppError.InterServerError('SERVICE_SIGNUP_INSERT_ERROR')
        }
        if (!user) {
            throw AppError.BadRequest('SERVICE_CREATE_USER_ERROR')
        }
        delete user.password

        return {
            ...user,
            displayName: firstName + ' ' + lastName
        }
    }

    async userSignin(body) {
        const { email, password } = body;
        let user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw AppError.BadRequest('EMAIL_NOT_FOUND');
        }

        const isPass = await BcryptUtils.compare(password, user.password);
        if (!isPass) {
            throw AppError.BadRequest('PASSWORD_INCORRECT');
        }
        try {
            const [token, refreshToken] = await Promise.all([
                JwtUtils.generateToken({
                    id: user.id,
                    email: user.email
                }),
                JwtUtils.generateRefreshToken({
                    id: user.id,
                    email: user.email
                }),
            ]);
            await Promise.all([
                this.tokenRepository.upsert({
                    userId: user.id,
                    refreshToken: refreshToken.accessToken,
                    expiresIn: process.env.REFRESH_TOKEN_LIFE,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }),
                this.refreshTokenRepository.create({
                    user_id: user.id,
                    token: token.accessToken,
                    expiryDate: this.addHours(1),
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            ]) 
            ObjectUtils.deleteFields(
                user,
                'password',
                'createdAt',
                'updatedAt'
            );
    
            return {
                user: {
                    ...user,
                    displayName: user.firstName + ' ' + user.lastName
                },
                token: token.accessToken,
                refreshToken: refreshToken.accessToken,
                expiredAt: Moment().utc().add('30', 'days')
            };
        } catch (error) {
            console.log(error.message)
            throw AppError.InterServerError('SERVICE_SIGNUP_ERROR')
        }
    }

    async userSignout(body) {
        try {
            const { user } = body
            await this.refreshTokenRepository.delete({user_id:  user.id})
            return
        } catch (error) {
            console.log(error.message)
            throw AppError.InterServerError('SERVICE_SIGN_OUT_ERROR')
        }
    }

    async refreshToken(body) {
        try {
            const { user } = body
            const [token, refreshToken] = await Promise.all([
                JwtUtils.generateToken({
                    id: user.id,
                    email: user.email
                }),
                JwtUtils.generateRefreshToken({
                    id: user.id,
                    email: user.email
                }),
            ]);
            await Promise.all([
                this.tokenRepository.upsert({
                    userId: user.id,
                    refreshToken: refreshToken.accessToken,
                    expiresIn: process.env.REFRESH_TOKEN_LIFE,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }),
                this.refreshTokenRepository.create({
                    user_id: user.id,
                    token: token.accessToken,
                    expiryDate: this.addHours(1),
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            ]) 
            return {
                token: token.accessToken,
                refreshToken: refreshToken.accessToken,
            }
        } catch (error) {
            console.log(error.message)
            throw AppError.InterServerError('SERVICE_REFRESH_TOKEN_ERROR')
        }
    }

    addHours(numOfHours, date = new Date())  {
        date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
        return date;
    }
} 
