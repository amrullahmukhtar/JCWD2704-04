/** @format */
import adminController from '../controllers/admin.controller';
import { EntityRouter } from './entity.router';

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post('/ad1', adminController.registerAdmin.bind(adminController));

  }
}
export default new userRouter();
