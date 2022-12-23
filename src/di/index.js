import { asClass, createContainer, InjectionMode } from 'awilix';
// import {
//     UserRepository,
// } from '../repositories';
import {
    AuthService,
    UserService,
} from '../services';

import {
    AuthController,
    UserController,
} from '../controllers';
const container = createContainer({ injectionMode: InjectionMode.PROXY });

// container.register({
//     userRepository: asClass(UserRepository).singleton()
// });

container.register({
    authService: asClass(AuthService).singleton(),
    userService: asClass(UserService).singleton(),
});

container.register({
    authController: asClass(AuthController).singleton(),
    userController: asClass(UserController).singleton(),
});
export { container };