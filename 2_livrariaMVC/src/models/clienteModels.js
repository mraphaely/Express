import connection from "../config/conn.js"

const tableClientes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS clientes(
        cliente_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

//CONECTAR ao BANCO
connection.query(tableClientes, (err, result, field) => {
    if (err) {
        console.error('Erro ao criar tabela MySQL:' + err.stack);
        return
    }
    console.log('Tabela [clientes] MySQL criada com sucesso!');
});