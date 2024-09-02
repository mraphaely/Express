import { Router } from "express";
import { register, login, checkUser } from "../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", checkUser);

export default router;
