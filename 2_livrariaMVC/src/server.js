//npm init -y
//npm i express uuid mysql2 dotenv --save
//npm i -D nodemon

import "dotenv/config";
import express, { request, response } from "express";
import connection from "./config/conn";
import livroRoutes from "../src/routes/livroRoutes";
import clienteRoutes from "../src/routes/clienteRoutes";
import funcionarioRoutes from "../src/routes/funcionarioRoutes";

//extensão Inline SQL Highlight

const app = express();

//Receber dados no formato JSON
app.use(express.json());

app.use("/livros", livroRoutes);
app.use("/clientes", clienteRoutes);
app.use("/funcionarios", funcionarioRoutes);
