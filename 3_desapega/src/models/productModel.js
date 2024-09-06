import conn from "../config/connectionDB.js";

const tableProduct = /*sql*/`
     CREATE TABLE IF NOT EXISTS products(
        product_id VARCHAR(60) PRIMARY KEY,
        user_id VARCHAR(60) NOT NULL,
        nome VARCHAR(255) NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        imagem VARCHAR(255) NOT NULL,
        FOREIGN KEY(product_id) REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
     )
`
conn.query(tableProduct, (err) => {
    if(err){
       return console.error(err);
    }
    console.log("Tabela [Produtos] criada com sucesso!");
});
