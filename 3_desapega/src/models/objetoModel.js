import conn from "../config/connectionDB.js";

const tableObjeto = /*sql*/`
     CREATE TABLE IF NOT EXISTS objetos(
        objeto_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        categoria VARCHAR(255) NOT NULL,
        peso VARCHAR(255) NOT NULL,
        cor VARCHAR(255) NOT NULL,
        descricao TEXT,
        disponivel BOOLEAN,
        preco DECIMAL(5, 2) NOT NULL,
        user_id VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
     )
`
conn.query(tableObjeto, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [objetos] criada com sucesso!");
});
