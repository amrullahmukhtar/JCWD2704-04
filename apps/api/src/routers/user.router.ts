import userController from '../controllers/user.controller';
import { EntityRouter } from './entity.router';
import { tokenAuth } from '../middleware/tokenAuth';

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.post('/v1', userController.register.bind(userController));
    this.router.post(
      '/v1/bygoogle',
      userController.regisWithGoogle.bind(userController),
    );
    this.router.post(
      '/verify-email',
      userController.verifyEmail.bind(userController),
    );
    this.router.get(
      '/validate',
      tokenAuth,
      userController.validate.bind(userController),
    );
    this.router.post('/v2', userController.login.bind(userController));
    this.router.post(
      '/v2/bygoogle',
      userController.loginWithGoogle.bind(userController),
    );
    this.router.post(
      '/forgot',
      userController.forgotPassword.bind(userController),
    );
    this.router.patch(
      '/recovery',
      userController.resetPassword.bind(userController),
    );
  
  }
}

export default new userRouter();
