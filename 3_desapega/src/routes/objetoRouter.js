import { Router } from "express";
import { create, getAllObjectUser } from "../controllers/objetoController.js";

const router = Router();

//helpers
import verifyToken from "../helpers/verify-token.js";
import imageUpload from "../helpers/image-upload.js";

router.post("/", verifyToken, imageUpload.array("images", 10), create);
router.get("/myobjects", verifyToken, getAllObjectUser);

export default router;