import { Router } from "express";
import UserRoutes from "../../services/user/user.routes";

const router = Router();

router.use("/user", UserRoutes);

export default router;
