import { Router } from "express";
import AuthRoutes from "./auth.route.js";
import UserRoutes from "./user.route.js";
const router = Router();

router.use("/api", AuthRoutes);
router.use("/api", UserRoutes);

export default router;
