import express, { request } from "express"; //importando o express

const PORT = 3333
const app = express(); //criando uma instância do express

//parte 01 - Roteamento - GET, POST, PUT/PATCH, DELETE
//parte 02 - Roteamento - receber informações
/* Formas
 1 - QUERY PARAMS -> GET ->/users?nome=Carlos&cargo=Instrutor
 2 - ROUTE PARAMS -> GET, PATCH, DELETE -> /users/1
 3 - BODY PARAMS -> POST -> /users = {JSON}
*/

//usando o middleware json para converter o corpo da requisição em json
app.use( express.json() ); 
//para converter o corpo da requisição em json quando são .img
app.use( express.urlencoded({ extended: true }) ); 

// 1- QUERY PARAMS
app.get('/users', (request, response) => {
    // response.status(200).json({message: "Hello World!"})
    console.log(request.query)
    const {nome, cargo, idade} = request.query
    // const nome = request.query.nome
    // const cargo = request.query.cargo
    // const idade = request.query.idade
    response.status(200).json({nome, cargo, idade})
})

app.post('/users', (request, response) => {
    const { nome, cargo, idade } = request.body
    response.status(201).json({ nome, cargo, idade })

})
// 2 - ROUTE PARAMS 
app.put('/users/:id/:idade', (request, response) => {
    const { id, idade } = request.params
    response.status(200).json({ "user": id, "idade": idade })
})
app.delete('/users', (request, response) => {
    response.status(200).json([
        'user 10',
        'user 03',
        'user 04'
    ])
})


app.listen(PORT, () => {
    console.log(" Servidor on PORT: " + PORT)
})