import connection from "../config/conn.js";
import { v4 as uuidv4 } from 'uuid';

export const listarFuncionarios = (request, response) => {
    //request, não existe
    const selectSQL = /*sql*/ `SELECT * FROM funcionarios`
    connection.query(selectSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao listar funcionarios" })
            return
        }
        const funcionarios = data
        response.status(200).json(funcionarios)
    })
};

export const AdicionarFuncionarios = (request, response) => {
    const { nome, email, cargo, data_contratacao, salario } = request.body
    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório." })
    }
    if (!email) {
        return response.status(400).json({ message: "O email é obrigatório." })
    }
    if (!cargo) {
        return response.status(400).json({ message: "O cargo é obrigatório." })
    }
    if (!data_contratacao) {
        return response.status(400).json({ message: "A data de contratação é obrigatório." })
    }
    if (!salario) {
        return response.status(400).json({ message: "O salario é obrigatório." })
    }
    if (!email.includes("@")) {
        return response.status(400).json({ message: "Email faltando @." })
    }
    //1- Não existe funcionario com email igual 
    const sql = /*sql*/`SELECT * FROM funcionarios WHERE email = "${email}"`
    connection.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao cadastrar funcionário" })
            return
        }
        if (data.length > 0) {
            return response.status(409).json({ message: "Email já está em uso." })
        }

        const id = uuidv4()
        const insertSql = /*sql*/`INSERT INTO funcionarios (funcionario_id, nome, email, cargo, data_contratacao, salario)
        VALUES
        ("${id}", "${nome}", "${email}", "${cargo}", "${data_contratacao}", "${salario}")`
        connection.query(insertSql, (err, data) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao cadastrar funcionário." })
                return
            }
            response.status(201).json({ message: "Funcionário cadastrado com sucesso" })
        })
    })
};

export const editarFuncionarios = (request, response) => {
    const { id } = request.params
    const { nome, email, cargo, data_contratacao, salario } = request.body

    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório." })
    }
    if (!email) {
        return response.status(400).json({ message: "O email é obrigatório." })
    }
    if (!cargo) {
        return response.status(400).json({ message: "O cargo é obrigatório." })
    }
    if (!data_contratacao) {
        return response.status(400).json({ message: "A data de contratação é obrigatório." })
    }
    if (!salario) {
        return response.status(400).json({ message: "O salario é obrigatório." })
    }
    if (!email.includes("@")) {
        return response.status(400).json({ message: "Email faltando @." })
    }

    //1° verificar se funcionario existe
    const checkSql = /*sql*/` SELECT * FROM funcionarios WHERE funcionario_id = "${id}"`
    connection.query(checkSql, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao procurar funcionarios" })
            return
        }
        if (data.length === 0) {
            response.status(404).json({ err: "Funcionario não encontrado" })
        }
    })
    //2° se o email está disponivel
    const checkEmailSQL = /*sql*/`SELECT * FROM funcionarios WHERE email = "${email}" AND funcionario_id != "${id}"`
    connection.query(checkEmailSQL, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao procurar funcionario" })
            return
        }
        if (data.length > 0) {
            response.status(409).json({ err: "Email já existe" });
        }
    })
    //3° atualizar email
    const updateSQL = /*sql*/ `UPDATE funcionarios SET nome = "${nome}", email = "${email}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}"
    WHERE funcionario_id = "${id}"
    `
    connection.query(updateSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao atualizar funcionário." })
            return
        }
        response.status(200).json({ message: "Funcionário atualizado com sucesso" })
    })
};

export const deletarFuncionarios = (request, response) => {
    const id = request.params.id
    const sql = /*sql*/`DELETE FROM funcionarios WHERE funcionario_id = "${id}"`
    connection.query(sql, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar funcionário." })
            return
        }
        if (info.affectedRows) {
            response.status(404).json({ message: "Funcionário não encontrado" })
        }
        response.status(200).json({ message: "Funcionário deletado com sucesso" })
    })
};

export const buscarFuncionarios = (request, response) => {
    const id = request.params
    const sql = /*sql*/ `SELECT * FROM funcionarios WHERE funcionario_id = "${id}"
    `
    connection.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar funcionário" });
            return
        }
        const funcionario = data[0]
        response.status(200).json(funcionario);
    })
};