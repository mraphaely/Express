import conn from "../config/connectionDB.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { response } from "express";

export const register = (request, response) => {
    const { nome, email, telefone, senha, confirmaSenha } = request.body

    if (!nome) {
        return response.status(400).json({ error: 'o campo nome é obrigatório' })
    }
    if (!email) {
        return response.status(400).json({ error: 'o campo email é obrigatório' })
    }
    if (!telefone) {
        return response.status(400).json({ error: 'o campo telefone é obrigatório' })
    }
    if (!senha) {
        return response.status(400).json({ error: 'O campo senha é obrigatório' })
    }
    if (!confirmaSenha) {
        return response.status(404).json({ error: 'O campo confirmar senha é obrigatório' })
    }
    //verifucar se email é valido
    if (!email.includes("@")) {
        return response.status(409).json({ error: 'Digite um email válido com @' })
    }
    //senha === confirmaSenha
    if (senha !== confirmaSenha) {
        return response.status(409).json({ error: 'A senha e a confirmação de senha devem ser iguais' })
    }

    const checkSql = /*sql*/`SELECT * FROM users WHERE ?? = ?`
    const checkSqlData = ['email', email];
    conn.query(checkSql, checkSqlData, async (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ error: 'Erro ao verificar se o email já existe' });
        }
        //2°
        if (data.length > 0) {
            return response.status(409).json({ error: 'Email já está em uso.' })
        }
        //Posso fazer o registro
        const salt = await bcrypt.genSalt(12)
        // console.log(salt)
        const senhaHash = await bcrypt.hash(senha, salt)
        // console.log("Senha digitada:", senha)
        // console.log("Senha criptografada:", senhaHash)

        //criar user
        const id = uuidv4();
        const user_img = "userDafault.png"

        const insertSql = /*sql*/`INSERT INTO users (??, ??, ??, ??, ??, ??)
    VALUES (?, ?, ?, ?, ?, ?)`
        const insertSqlData = ["user_id", "nome", "email", "telefone", "senha", "imagem",
            id, nome, email, telefone, senhaHash, user_img];

        conn.query(insertSql, insertSqlData, (err) => {
            if (err) {
                console.log(err)
                return response.status(500).json({ error: 'Erro ao cadastrar usuário' })
            }
            response.status(201).json({ message: "Usuário cadastrado" })
        })
    })
};

export const login = (request, response) => {
    const { email, senha } = request.body;
    if (!email) {
        return response.status(409).json({ error: 'O campo email é obrigatório' })
    }
    if (!senha) {
        return response.status(409).json({ error: 'O campo senha é obrigatório' })
    }

    const checkEmailSql = /*sql*/`SELECT * FROM users WHERE ?? = ?`
    const checkEmailSqlData = ['email', email];
    conn.query(checkEmailSql, checkEmailSqlData,  async (err, data) => {
        if (err) {
            console.log(err)
            return response.status(500).json({ error: 'Erro ao fazer login' })
        }
        if (data.length === 0) {
            return response.status(401).json({ error: 'Email não está cadastrado' })
        }
        const user = data[0]
        console.log(user.senha)

        //comparar senha
        const comparaSenha = await bcrypt.compare(senha, user.senha)
        console.log("compara senha", comparaSenha)//boolean

        if(!comparaSenha){
            return response.status(401).json({ error: 'Senha inválida' })
        }
        response.status(200).json( {message: "Você está logado."} )
    })

};