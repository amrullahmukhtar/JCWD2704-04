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
    this.router.get('/companyAll', adminController.getAllCompanies.bind(adminController));
    this.router.get('/ad1/:id', adminController.getCompanyById.bind(adminController))
    this.router.patch("/:id",tokenAuth, adminController.updateAdminData.bind(adminController));
    this.router.post("/content/:company_id",tokenAuth, adminController.postContent.bind(adminController));
    this.router.get("/content/:company_id",tokenAuth, adminController.getContent.bind(adminController));


  }
}
export default new userRouter();
