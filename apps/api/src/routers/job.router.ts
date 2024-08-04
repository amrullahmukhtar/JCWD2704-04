/** @format */

import { tokenAuth } from '@/middleware/tokenAuth';
import jobController from '../controllers/job.controller';
import { EntityRouter } from './entity.router';
import { cvUpload } from '@/lib/multer';

class JobRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }

  private initializedRoutes() {
    this.router.get('/', jobController.getAllJob.bind(jobController));
    this.router.get('/:id', jobController.getJobById.bind(jobController));
    this.router.get(
      '/jobCompany/:admin_id',
      jobController.getJobsByCompany.bind(jobController),
    );
    this.router.post(
      '/apply/:jobId',
      tokenAuth,
      cvUpload.single('cv'),
      jobController.applyJob.bind(jobController),
    );
    this.router.get(
      '/applications/:userId',
      tokenAuth,
      jobController.getApplicationsByUser.bind(jobController),
    );
    this.router.get(
      '/application/:userId/:jobId',
      tokenAuth,
      jobController.getApplicationDetails.bind(jobController),
    );
  }
}

export default new JobRouter();
