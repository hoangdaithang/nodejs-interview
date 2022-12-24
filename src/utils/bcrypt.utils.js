import bcrypt from 'bcrypt-nodejs';
export default class BcryptUtils {
    static hash(originPassword, rounds = 10) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(rounds, (err, salt) => {
                if (err) reject(err);
                bcrypt.hash(originPassword, salt, null, (err, hash) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(hash);
                });
            });
        });
    }

    static compare(origin, hash) {
        return new Promise(function(resolve, reject) {
            bcrypt.compare(origin, hash, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
}
