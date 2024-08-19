//npm init -y
//npm i express uuid mysql2 dotenv --save
//npm i -D nodemon

import "dotenv/config";
import express from "express";

//conexão com o banco de dados;
import connection from "./config/conn.js";

//importação dos módulos e criações das tabelas
import "./models/livroModels.js"
import "./models/funcionarioModels.js"
import "./models/clienteModels.js"

//importação das rotas
import livroRoutes from "../src/routes/livroRoutes.js";
import clienteRoutes from "../src/routes/clienteRoutes.js";
import funcionarioRoutes from "../src/routes/funcionarioRoutes.js";

//extensão Inline SQL Highlight

const app = express();

//Receber dados no formato JSON
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

//rotas http://localhost:3333
app.use("/livros", livroRoutes);
app.use("/clientes", clienteRoutes);
app.use("/funcionarios", funcionarioRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request, response) => {
    response.send("Hello, world!");
});
