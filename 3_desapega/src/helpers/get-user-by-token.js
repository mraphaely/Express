import jwt from "jsonwebtoken";
import conn from "../config/connectionDB.js";

const getUserByToken = async (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return response.status(401).json({ message: "Acesso Negado" })
        }

        const decoded = jwt.verify(token, "SENHASUPERSEGURA")
        const userId = decoded.id

        const checkSql = /*sql*/`SELECT * FROM users WHERE ?? = ?`
        const checkSqlData = ["user_id", userId]
        conn.query(checkSql, checkSqlData, (err, data) => {
            if (err) {
                return response.status(500).json({ message: "Erro ao buscar usuário" })
            } else {
                resolve(data[0]);
            }
        })
    })
}

export default getUserByToken