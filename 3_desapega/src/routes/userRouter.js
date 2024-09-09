import { Router } from "express";
import { register, login, checkUser, getUserById, editUser } from "../controllers/userController.js";

//middlewares / helpers
import verifyToken from "../helpers/verify-token.js"
import imageUpload from "../helpers/image-upload.js"

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", checkUser);
router.get("/userbyid/:id", getUserById);
router.put("/edit/:id", verifyToken, imageUpload.single("imagem"), editUser);


export default router;
