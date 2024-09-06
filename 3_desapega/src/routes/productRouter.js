import { Router } from "express";
import { cadastroProduto, listarProdutos } from "../controllers/productController.js";

const router = Router();

router.post("/cadastroproduto", cadastroProduto);
router.get("/listarproduto", listarProdutos);

export default router;
