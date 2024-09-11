/*
 MODEL -> DB BD -> Regras de negócio.
 CONTROLLER -> Controla o que vem da view e devolve o que vem do model.
 VIEW -> Páginas.
*/
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";


//importar conexão com o banco
import conn from "./config/connectionDB.js";

//importar modulos
import "./models/userModel.js";
import "./models/objetoModel.js";
import "./models/objetoImagesModel.js"
// import "./models/productModel.js";

//importar as rotas
import userRouter from "./routes/userRouter.js";
import objetoRouter from "./routes/objetoRouter.js";
// import productRouter from "./routes/productRouter.js";

const PORT = process.env.PORT || 3333;
const app = express();

//apontar para pasta (PUBLIC)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 3 middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());//permite usar informações no formato json

// Pasta para os arquivos estáticos (PUBLIC) 
// app.use(express.static("public")); //só daria certo se o server não estivesse fora de src
app.use("/public", express.static(path.join(__dirname, "public")));

//utilizar rotas
app.use("/users", userRouter);
app.use("/objetos", objetoRouter);
// app.use("/products", productRouter);

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada." });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

/*
usuario -> mini mundo 
[POST] - cad. user
[POST] - çogin
[GET] - user logado
[] -
[] -
*/