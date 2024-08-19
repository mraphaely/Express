import { Router } from "express";

//import controllers
import { listarLivros, cadastrarLivros, buscarLivros, editarLivros, deletarLivros } from "../controllers/livrosController.js";

const router = Router();

//listar TODOS livros
router.get("/", listarLivros);

//adicionar
router.post("/criar", cadastrarLivros);

//Listar 1
router.get("/:id", buscarLivros);

//Atualizar
router.put("/editar/:id", editarLivros);

//Deletar
router.delete("/remover/:id", deletarLivros);
