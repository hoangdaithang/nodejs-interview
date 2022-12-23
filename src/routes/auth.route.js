import { container } from '../di';
import { Validator, Wrapper } from '../utils';
import {
    signUpValidator,
} from '../validators';
export default (_, router) => {
    router
        .route('/register')
        .post(
            [signUpValidator, Validator.validate],
            Wrapper.wrap(container.cradle.authController.userSignup)
        );
};
