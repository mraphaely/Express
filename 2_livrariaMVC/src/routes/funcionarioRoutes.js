/****************** ROTAS DE FUNCIONARIOS *********************/
/* tabela (id, nome, cargo, data_contratacao, salario, email, created_at, updated_at)
   1° Listar todos os funcionarios
   2° Cadastrar um funcionario (email é único)
   3° Listar um funcionário
   4° Atualizar um funcionário (não pode ter o email de outro func.)
   5° Deletar um funcionário
*/
import { Router } from "express";
import { AdicionarFuncionarios, buscarFuncionarios, deletarFuncionarios, editarFuncionarios, listarFuncionarios } from "../controllers/funcionarioController.js";

const router = Router();

router.get("/", listarFuncionarios);

router.post("/criar", AdicionarFuncionarios);

router.put("/editar/:id", editarFuncionarios);

router.delete("/remover/:id", deletarFuncionarios);

router.get("/:id", buscarFuncionarios);