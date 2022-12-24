export default class AuthController {
    constructor(opts) {
        this.authService = opts.authService;
        this.userService = opts.userService;
    };

    signup = async ({body, ns }) => {
        const response = await this.authService.userSignup(body,ns);
        return response;
    };

    signin = async ({body, ns }) => {
        const response = await this.authService.userSignin(body,ns);
        return response;
    };

    signout = async ({body, ns }) => {
        const response = await this.authService.userSignout(body,ns);
        return response;
    };

    refreshToken = async ({body, ns }) => {
        const response = await this.authService.refreshToken(body,ns);
        return response;
    };
}