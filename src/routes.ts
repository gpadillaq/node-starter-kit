import { Router } from "express";

import { authRouter, userRouter } from "./routes/";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
