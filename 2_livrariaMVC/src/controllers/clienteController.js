import connection from "../config/conn.js";
import { v4 as uuidv4 } from 'uuid';
import { sign } from "jsonwebtoken";

export const listarClientes = (request, response) => {
    const selectSQL = /*sql*/`SELECT * FROM clientes`
    connection.query(selectSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar clientes" });
            return
        }
        const clientes = data
        response.status(200).json(clientes);
    })
};

export const adicionarClientes = (request, response) => {
    const { nome, email } = request.body
    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório" })
    }
    if (!email) {
        return response.status(400).json({ message: "O email é obrigatório" })
    }
    if (!email.includes("@")) {
        return response.status(400).json({ message: "O email deve conter '@'" })
    }
    const checkEmailSQL = /*sql*/`SELECT * FROM clientes WHERE ?? = ?`
    const checkData = ["email", email];
    connection.query(checkEmailSQL, checkData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao verificar email" });
            return
        }
        if (data.length > 0) {
            return response.status(400).json({ message: "Email já está cadastrado." })
        }

        const id = uuidv4();
        const insertSQL = /*sql*/`INSERT INTO clientes (??, ??, ??) VALUES (?, ?, ?)`
        const insertData = [
            "cliente_id", "nome", "email", "senha", "imagem",
             id, nome, email, senha, imagem
            ];//lembrar de terminar
        connection.query(insertSQL, insertData, (err, data) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao cadastrar cliente" });
                return
            }
            response.status(201).json({ message: "Cliente cadastrado com sucesso" });
        });
    });
};

export const editarClientes = (request, response) => {
    const { id } = request.params
    const { nome, email } = request.body
    if (!nome) {
        return response.status(400).json({ message: "O nome é obrigatório" })
    }
    if (!email) {
        return response.status(400).json({ message: "O email é obrigatório" })
    }
    if (!email.includes("@")) {
        return response.status(400).json({ message: "O email deve conter '@'" })
    }
    const CheckClienteSQL = /*sql*/`SELECT * FROM clientes WHERE ?? = ?`
    const checkData = ["cliente_id", id];
    connection.query(CheckClienteSQL, checkData, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao verificar cliente" });
            return
        }
        if (data.length === 0) {
            return response.status(404).json({ message: "Cliente não encontrado" })
        }
    });
    const checkEmailSQL = /*sql*/`SELECT * FROM clientes WHERE ?? = ? AND ?? != ?`
    const checkMail = [
        "email", email,
        "cliente_id", id
    ];
    connection.query(checkEmailSQL, checkMail, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao procurar cliente" })
            return
        }
        if (data.length > 0) {
            response.status(409).json({ err: "Email já existe" });
        }
    });
    const updateSQL = /*sql*/`UPDATE clientes SET ?? = ?, ?? = ?
    WHERE ?? = ?
    `
    const checkDate = [
        "nome", "email", "cliente_id",
         nome, email, id
    ];
    connection.query(updateSQL, checkDate, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao atualizar cliente" });
            return
        }
        response.status(200).json({ message: "Cliente atualizado com sucesso" });
    });
};

export const deletarClientes = (request, response) => {
    const { id } = request.params
    const deleteClienteSQL = /*sql*/`DELETE FROM clientes WHERE ?? = ?
    `
    const checkDelete = [
        "cliente_id", id
    ];
    connection.query(deleteClienteSQL, checkDelete, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar cliente" });
            return
        }
        if (info.affectedRows) {
            response.status(404).json({ message: "Cliente não encontrado." })
        }
        response.status(200).json({ message: "Cliente deletado com sucesso." })
    })
};

export const buscarClientes = (request, response) => {
    const { id } = request.params
    const clienteSQL = /*sql*/`SELECT * FROM clientes WHERE ?? = ?`
    const checkCliente = [
        "cliente_id", id
    ]
    connection.query(clienteSQL, checkCliente, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar cliente" })
            return
        }
        const cliente = data[0]
        response.status(200).json(cliente);

    })

};

export const loginCliente = (request, response) => {
  if(request.body.email && request.body.senha) {
    let email = request.body.email; 
    let senha = request.body.senha; 

    const loginSQL = /*sql*/`SELECT cliente_id, nome, email, senha FROM clientes WHERE email = ? AND senha = ?`
    const checkLogin = [email, senha];
    connection.query(loginSQL, checkLogin, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao realizar login" });
            return
            }
            if (data.length > 0) {
                const user = results[0];

                const token = JWT.sign(
                    { id: user.cliente_id, email: user.email },
                    process.env.SECRET_KEY,
                    { expiresIn: '3h' }
                )
                response.status(200).json({ id: user.cliente_id, email: user.email, token });
            }else {
                response.status(404).json({ message: "Usuário não encontrado" });
            }
        });
  } else {
    response.status(400).json({ message: "Email e senha são obrigatórios" });
  }
};