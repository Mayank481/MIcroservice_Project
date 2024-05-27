import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();

router.get("/fetchuser/:id", UserController.getUser);
router.post("/fetchusers", UserController.getUsers);

export default router;
