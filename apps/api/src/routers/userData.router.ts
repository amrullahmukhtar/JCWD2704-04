/** @format */

import userDataController from "@/controllers/userData.controller";
import { EntityRouter } from "./entity.router";
import { tokenAuth } from "@/middleware/tokenAuth";

class UserDataRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", userDataController.getAllUserData.bind(userDataController));
    this.router.patch("/:id",tokenAuth, userDataController.updateUserData.bind(userDataController));

  }
}
export default new UserDataRouter();