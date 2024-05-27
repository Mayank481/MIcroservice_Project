import { Router } from "express";
import PostRoute from "./post.route.js";
const router = Router();

router.use("/api", PostRoute);

export default router;
