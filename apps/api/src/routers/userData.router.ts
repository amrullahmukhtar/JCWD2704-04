import userDataController from '@/controllers/userData.controller';
import { EntityRouter } from './entity.router';
import { tokenAuth } from '@/middleware/tokenAuth';
import { cvUpload, upload } from '@/lib/multer';

class UserDataRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get(
      '/',
      userDataController.getAllUserData.bind(userDataController),
    );
    this.router.patch(
      '/:id',
      tokenAuth,
      userDataController.updateUserData.bind(userDataController),
    );
    this.router.post(
      '/uploadAvatar/:id',
      tokenAuth,
      upload.single('avatar'), // Middleware for handling file upload
      userDataController.uploadAvatar.bind(userDataController), // Controller method to process upload
    );

    this.router.post(
      '/submitCv/:id',
      tokenAuth,

      cvUpload.single('cv'),
      userDataController.submitCV.bind(userDataController),
    );
    this.router.get(
      '/downloadCv/:id',
      tokenAuth,

      userDataController.downloadCV.bind(userDataController), // Controller method to download CV
    );
  }
}
export default new UserDataRouter();
