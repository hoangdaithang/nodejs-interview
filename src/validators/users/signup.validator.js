const { checkSchema } = require('express-validator');

// eslint-disable-next-line import/prefer-default-export
export const signUpValidator = checkSchema({
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'EMAIL_REQUIRED_ERROR'
        }
    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'FIELD_REQUIRED_ERROR'
        }
    },
    username: {
        in: ['body'],
        isLength: {
            options: {
                max: 255
            },
            errorMessage: 'FIELD_REQUIRED_ERROR'
        }
    }
});
