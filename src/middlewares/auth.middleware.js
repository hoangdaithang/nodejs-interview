import { unauthorizedResponse, notFoundResponse } from "../helpers/apiResponse";
import { JwtUtils } from '../utils'
const Refreshtoken = require('../models/refreshTokens')
const Tokens = require('../models/tokens')

const signupdMiddleware = async (req, res, next) => {
    next();
}

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return unauthorizedResponse(res, "Unauthorized !!!");
        const temp = authorization.split("Bearer ");
        if (temp.length !== 2 && temp[0] !== "") return unauthorizedResponse(res, "Unauthorized !!!");
        const accessToken = temp[1];
        const decodedToken = await JwtUtils.verifyToken(accessToken, process.env.JWT_SECRET);
        if (!decodedToken) return unauthorizedResponse(res, "Unauthorized !!!");

        const now = new Date()
        const token = await Refreshtoken.query().select('*').where('token', accessToken)
            .andWhere('expiryDate', '>', now.setTime(now.getTime()))
        if(!token.length) {
            return unauthorizedResponse(res, "Unauthorized !!!");
        }

        req.body.user = decodedToken.data;
        next();
    } catch (error) {
        console.log(error);
        return unauthorizedResponse(res, "Unauthorized !!!");
    }
}

const refreshTokenMiddleware = async (req, res, next) => {
    try {
        const { refreshtoken } = req.headers;
        if (!refreshtoken) return notFoundResponse(res, "Not found");
        const temp = refreshtoken.split("Bearer ");
        if (temp.length !== 2 && temp[0] !== "") return notFoundResponse(res, "Not found");
        const accessToken = temp[1];
        const decodedToken = await JwtUtils.verifyToken(accessToken, process.env.JWT_SECRET);
        if (!decodedToken) return notFoundResponse(res, "Not found");

        const token = await Tokens.query().select('*').where('refreshToken', accessToken)
            .andWhere('updatedAt', '>', addHours(30))
        if(!token.length) {
            return notFoundResponse(res, "Not found");
        }

        req.body.user = decodedToken.data;
        next();
    } catch (error) {
        console.log(error);
        return notFoundResponse(res, "Not found");
    }
}

const addHours = (numOfDays, date = new Date()) => {
    date.setTime(date.getTime() - numOfDays * 24 * 60 * 60 * 60 * 1000);
    return date;
}


export { signupdMiddleware, authentication, refreshTokenMiddleware};
