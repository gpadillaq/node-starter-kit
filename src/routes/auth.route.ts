import { Router } from "express";
import {
  registerUser,
  loginUser,
  validateEmail,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate-email/:token", validateEmail);

export default router;
