/** @format */
import { tokenAuth } from '@/middleware/tokenAuth';
import adminController from '../controllers/admin.controller';
import { EntityRouter } from './entity.router';

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post('/ad1', adminController.registerAdmin.bind(adminController));
    this.router.patch("/:id",tokenAuth, adminController.updateAdminData.bind(adminController));


  }
}
export default new userRouter();
