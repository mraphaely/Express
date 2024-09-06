import { Router } from "express";

import { cadastroProduto, listarProdutos } from "../controllers/productController.js";
//middlewares
import verifyToken from "../helpers/verify-token.js"

const router = Router();

router.post("/cadastroproduto", verifyToken,cadastroProduto);
router.get("/listarproduto", listarProdutos);

export default router;
