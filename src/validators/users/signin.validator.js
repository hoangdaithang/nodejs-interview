const { checkSchema } = require('express-validator');

export const signinValidator = checkSchema({
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'EMAIL_REQUIRED_ERROR'
        },
        isEmail: {
            errorMessage: 'EMAIL_REQUIRED_ERROR'
        }
    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'PASSWORD_REQUIRED_ERROR'
        },
        isLength: {
            options: {
                min: 8,
                max: 20
            },
            errorMessage: 'PASSWORD_REQUIRED_ERROR'
        }
    }
});
