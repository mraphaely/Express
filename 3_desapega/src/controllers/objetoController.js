import conn from "../config/connectionDB.js";
import { v4 as uuidv4 } from "uuid";

//helpers
import verifyToken from "../helpers/verify-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import getToken from "../helpers/get-token.js";

export const create = async (request, response) => {
    const { nome, categoria, peso, cor, descricao, preco } = request.body;
    const disponivel = 1;

    ///buscar user por token
    const token = getToken(request)
    const user = await getUserByToken(token)
    // console.log(user)

    if (!nome) {
        return response.status(400).json({ message: "O nome do objeto é obrigatório" })
    }
    if (!categoria) {
        return response.status(400).json({ message: "A categoria do objeto é obrigatória" })
    }
    if (!peso) {
        return response.status(400).json({ message: "O peso do objeto é obrigatório" })
    }
    if (!cor) {
        return response.status(400).json({ message: "A cor do objeto é obrigatória" })
    }
    if (!descricao) {
        return response.status(400).json({ message: "A descrição do objeto é obrigatória" })
    }
    if (!preco) {
        return response.status(400).json({ message: "O preço do objeto é obrigatório" })
    }

    const objeto_id = uuidv4();
    const user_id = user.user_id;
    const objetoSql = /*sql*/`INSERT INTO objetos (??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const objetoValues = [
        "objeto_id", "nome", "categoria", "peso", "cor", "descricao", "disponivel", "preco", "user_id",
           objeto_id, nome, categoria, peso, cor, descricao, disponivel, preco, user_id
    ];

    conn.query(objetoSql, objetoValues, (err) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao adicionar objeto" });
        }
        // [imagem1.png, imagem]
        if (request.files) {
            //cad das imagens
            const imagemSql = /*sql*/`INSERT INTO objeto_images (image_id, image_path, objeto_id) VALUES ?`;

            const imageValues = request.files.map((file) => [
                uuidv4(),
                file.filename,
                objeto_id
            ]);
            conn.query(imagemSql, [imageValues], (err) => {
                if (err) {
                    console.error(err);
                    return response.status(500).json({ err: "Não foi possível adicionar imagens ao objeto" })
                }
                response.status(201).json({ message: "Objeto criado com sucesso!" })
            });

        } else {
            response.status(201).json({ message: "Objeto criado com sucesso!" })
        };
    });
    // response.status(200).json("Chegou aqui")
};

//Listar todos os obj de um user