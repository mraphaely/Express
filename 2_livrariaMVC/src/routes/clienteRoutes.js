/**************** Rotas Clientes *********************/
/* tabela (cliente_id, nome, email, created_at, updated_at)
1° Listar todos os clientes
2° Cadastrar um cliente (email é único)
3° Listar um cliente
4° Atualizar um cliente (não pode ter o email de outro func.)
5° Deletar um cliente
*/
import { Router } from "express";
import { adicionarClientes, buscarClientes, deletarClientes, editarClientes, listarClientes } from "../controllers/clienteController";

const router = Router();

router.get("/", listarClientes);

router.post("/criar", adicionarClientes);

router.put("/editar/:id", editarClientes);

router.delete("/remover/:id", deletarClientes);

router.get("/:id", buscarClientes);
