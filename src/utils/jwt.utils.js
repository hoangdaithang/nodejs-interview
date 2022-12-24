import jwt from 'jsonwebtoken';
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
const accessTokenSecret = process.env.JWT_SECRET
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE

export default class JwtUtils {
    static generateToken(user) {
        return new Promise((resolve, reject) => {
            const numberOfTokenLifeTime = parseFloat(accessTokenLife);
            let timeAccessTokenExpire = new Date();
            timeAccessTokenExpire = timeAccessTokenExpire.setDate(
                timeAccessTokenExpire.getDate() + numberOfTokenLifeTime
            );
            const userData = {
                id: user.id,
                email: user.email,
            };
            jwt.sign(
                { data: userData },
                accessTokenSecret,
                {
                    algorithm: "HS256",
                    expiresIn: accessTokenLife,
                },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    let jwtToken = {
                        accessToken: token,
                        timeAccessTokenExpire: timeAccessTokenExpire,
                    };
                    resolve(jwtToken);
                }
            );
        });
    }

    static generateRefreshToken(user) {
        return new Promise((resolve, reject) => {
            const numberOfTokenLifeTime = parseFloat(refreshTokenLife);
            let timeAccessTokenExpire = new Date();
            timeAccessTokenExpire = timeAccessTokenExpire.setDate(
                timeAccessTokenExpire.getDate() + numberOfTokenLifeTime
            );
            const userData = {
                id: user.id,
                email: user.email,
            };
            jwt.sign(
                { data: userData },
                accessTokenSecret,
                {
                    algorithm: "HS256",
                    expiresIn: refreshTokenLife,
                },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    let jwtToken = {
                        accessToken: token,
                        timeAccessTokenExpire: timeAccessTokenExpire,
                    };
                    resolve(jwtToken);
                }
            );
        });
    }

    static verifyToken(token, secretKey) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
    }
}
