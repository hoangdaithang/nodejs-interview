import JWT from 'jsonwebtoken';

export default class JwtUtils {
    static getToken({ query, headers, socket }) {
        let authorization = null;
        if (query && query.token) {
            return query.token;
        } else if (headers && headers[process.env.AUTHORIZATION]) {
            authorization = headers[process.env.AUTHORIZATION];
        } else if (socket && socket.handshake) {
            authorization = socket.handshake.headers[process.env.AUTHORIZATION];
        }
        console.log({ authorization });

        if (authorization) {
            const parts = authorization.split(' ');
            if (parts.some(item => item == 'Bearer')) {
                if (parts.length === 2 && parts[0] === 'Bearer') {
                    return parts[1];
                }
            } else {
                return parts[0];
            }
        }
        return null;
    }

    static async signToken(payload, privateKey = process.env.JWT_SECRET, expiresIn = 2592000) {
        return JWT.sign(payload, privateKey, { expiresIn });
    }

    static async refreshToken(payload, privateKey = process.env.JWT_SECRET, expiresIn = '365d') {
        return JWT.sign(payload, privateKey, { expiresIn });
    }

    static async verifyToken(
        token,
        ignoreExpiration = false,
        secretOrPublicKey = process.env.JWT_SECRET
    ) {
        return JWT.verify(token, secretOrPublicKey, { ignoreExpiration });
    }
}
