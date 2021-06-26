import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listTagsController = new ListTagsController();

router.post("/users", createUserController.handle)
router.post(
  "/tags", 
  ensureAuthenticated, 
  ensureAdmin, 
  createTagController.handle
  );

router.get("/tags", ensureAuthenticated, listTagsController.handle)

router.post("/login", authenticateUserController.handle)
router.post(
  "/compliments", 
  ensureAuthenticated, 
  complimentController.handle
);

router.get("/users/compliments/receive", ensureAuthenticated , listUserReceiveComplimentsController.handle)
router.get("/users/compliments/send", ensureAuthenticated ,listUserSendComplimentsController.handle)



//
export { router}
