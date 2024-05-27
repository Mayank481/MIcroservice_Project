import { Router } from "express";
import authMiddleware from "../middleware/post.middleware.js";
import PostController from "../controller/post.controller.js";

const router = Router();

router.post("/post", authMiddleware, PostController.store);

router.get("/fetchpost", PostController.index);
export default router;
