import { Router } from "express";
import { register, login, checkUser, getUserById, editUser } from "../controllers/userController.js";

//middlewares
import verifyToken from "../helpers/verify-token.js"

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", checkUser);
router.get("/userbyid/:id", getUserById);
router.put("/edit/:id", verifyToken, editUser);

export default router;
