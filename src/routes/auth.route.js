import { container } from '../di';
import { Validator, Wrapper } from '../utils';
import { signUpValidator, signinValidator } from '../validators';
import { signupdMiddleware, refreshTokenMiddleware, authentication} from '../middlewares/auth.middleware'

export default (_, router) => {
    router
        .route('/sign-up')
        .post(
            [signUpValidator, signupdMiddleware, Validator.validate],
            Wrapper.created(container.cradle.authController.signup)
        );

    router
        .route('/sign-in')
        .post(
            [signUpValidator, signinValidator, Validator.validate],
            Wrapper.sucsses(container.cradle.authController.signin)
        );

    router
        .route('/sign-out')
        .post(
            [ authentication ],
            Wrapper.logout(container.cradle.authController.signout)
        );

    router
        .route('/refresh-token')
        .post(
            [ refreshTokenMiddleware ],
            Wrapper.sucsses(container.cradle.authController.refreshToken)
        );
};
