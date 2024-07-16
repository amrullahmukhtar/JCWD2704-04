/** @format */

import jobController from "../controllers/job.controller";
import { EntityRouter } from "./entity.router";

class JobRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", jobController.getAllJob.bind(jobController));
    this.router.get("/:job_Id", jobController.getJobById.bind(jobController));

  }
}
export default new JobRouter();