import connection from "../config/conn.js"

const tableFuncionarios = /*sql*/ `
    CREATE TABLE IF NOT EXISTS funcionarios(
        funcionario_id VARCHAR(60) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        cargo VARCHAR(255) NOT NULL,
        data_contratacao DATE NOT NULL,
        salario FLOAT(5, 2)  NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

//CONECTAR ao BANCO
connection.query(tableFuncionarios, (err, result, field) => {
    if (err) {
        console.error('Erro ao criar tabela MySQL:' + err.stack);
        return
    }
    console.log('Tabela [funcionarios] MySQL criada com sucesso!');
});