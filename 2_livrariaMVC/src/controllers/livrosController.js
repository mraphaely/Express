import connection from "../config/conn";
import { v4 as uuidv4 } from 'uuid';

export const  listarLivros =  (request, response) => {
    const MySQL =   /*sql*/ `SELECT * FROM livros`
    connection.query(MySQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao buscar livros" })
            return
        }
        const livros = data
        response.status(200).json(livros)
    })
};

export const  cadastrarLivros = (request, response) => {
    const { titulo, autor, ano_publicacao, genero, preco } = request.body

    //validações
    if (!titulo) {
        response.status(400).json({ err: "O campo Título é obrigatório" });
        return;
    }
    if (!autor) {
        response.status(400).json({ err: "O campo Autor é obrigatório" });
        return;
    }
    if (!ano_publicacao) {
        response.status(400).json({ err: "O campo Ano de Publicação é obrigatório" });
        return;
    }
    if (!genero) {
        response.status(400).json({ err: "O campo Gênero é obrigatório" });
        return;
    }
    if (!preco) {
        response.status(400).json({ err: "O campo Preço é obrigatório" });
        return;
    }

    //verificar se o livro  não foi cadastrado
    const checkSQL = /*sql*/ `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`
    connection.query(checkSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao buscar livro" })
            return;
        }
        if (data.length > 0) {
            response.status(400).json({ err: "Livro já cadastrado" });
        }
        //cadastrar o livro
        const id = uuidv4()
        const disponibilidade = 1
        const insertSQL = /*sql*/ `INSERT INTO livros (livro_id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
     VALUES ("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}", "${preco}", "${disponibilidade}")
     `;
        connection.query(insertSQL, (err) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao cadastrar livro" })
                return
            }
            response.status(201).json({ message: "livro cadastrado" })
        })


    })
};

export const  buscarLivros = (request, response) => {
    const { id } = request.params
    const selectSQL = /*sql*/ `SELECT * FROM livros WHERE livro_id = "${id}"`

    connection.query(selectSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao buscar livro" })
            return
        }
        if (data.length === 0) {
            response.status(404).json({ err: "Livro não encontrado" })
            return
        }

        const livro = data[0]
        response.status(200).json(livro);
    })
};

export const  editarLivros = (request, response) => {
    const { id } = request.params
    const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } = request.body

    if (!titulo) {
        response.status(400).json({ err: "O campo Título é obrigatório" });
        return;
    }
    if (!autor) {
        response.status(400).json({ err: "O campo Autor é obrigatório" });
        return;
    }
    if (!ano_publicacao) {
        response.status(400).json({ err: "O campo Ano de Publicação é obrigatório" });
        return;
    }
    if (!genero) {
        response.status(400).json({ err: "O campo Gênero é obrigatório" });
        return;
    }
    if (!preco) {
        response.status(400).json({ err: "O campo Preço é obrigatório" });
        return;
    }
    if (disponibilidade === undefined) {
        response.status(400).json({ err: "O campo disponibilidade é obrigatório" });
        return;
    }

    const selectSQL = /*sql*/ `SELECT * FROM livros WHERE livro_id = "${id}"`

    connection.query(selectSQL, (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao buscar livro" })
            return
        }
        if (data.length === 0) {
            response.status(404).json({ err: "Livro não encontrado" })
            return
        }

        const updateSQL = /*sql*/ `UPDATE livros SET titulo = "${titulo}",
        autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", 
        preco = "${preco}", disponibilidade = "${disponibilidade}" WHERE livro_id = "${id}" 
        `
        connection.query(updateSQL, (err, info) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao atualizar livro" })
                return
            }
            console.log(info)
            response.status(200).json({ mensagem: "Livro atualizado." })
        })
    })

};

export const  deletarLivros = (request, response) => {
    const { id } = request.params

    const deleteSQL = /*sql*/ `DELETE FROM livros WHERE livro_id = "${id}"
   `
    connection.query(deleteSQL, (err, info) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar livro" })
            return
        }
        if (info.affectedRows === 0) {
            response.status(404).json({ err: "Livro não encontrado" })
        }

        response.status(200).json({ mensagem: "Livro deletado." })
    })
};