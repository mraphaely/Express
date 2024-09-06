import conn from "../config/connectionDB.js";
import { v4 as uuidv4 } from "uuid";


export const cadastroProduto = (request, response) => {
    const { nome, descricao, imagem } = request.body

    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!descricao) {
        return response.status(400).json({ error: 'o campo descrição é obrigatório' })
    }
        //criar produto
        const id = uuidv4();
        const userId = uuidv4();
        const product_img = "productDafault.png"

        const insertSql = /*sql*/`INSERT INTO products (??, ??, ??, ??, ??)
    VALUES (?, ?, ?, ?, ? )`
        const insertSqlData = ["product_id", "user_id", "nome", "descricao","imagem",
            id, userId, nome, descricao, product_img];

        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao cadastrar produto' })
            }
            response.status(201).json({ message: "Produto cadastrado" })
        })
};

export const listarProdutos = (response) => {
    const selectSQL = /*sql*/`SELECT * FROM products`
    connection.query(selectSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar clientes" });
            return
        }
        const produto = data
        response.status(200).json(produto);
    })
};
