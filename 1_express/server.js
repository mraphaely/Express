import express, { request, response } from "express";
import { v4 as uuidv4 } from "uuid";

const PORT = 3333
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const logRoutes =   (request, response, next) => {
    const { url, method } = request
    const rota = `[${method.toUpperCase()}] ${url}`
    console.log(rota)
    next();//obrigatório pra funcionar
}

app.use(logRoutes)

const usuarios = []
app.get('/usuarios', (request, response) => {
    // response.send('Hello World!')
    response.status(200).json(usuarios)
});

app.post('/usuarios', (request, response) => {
    const { nome, cargo } = request.body

    //validações
    if(!nome){
        response.status(400).json({message: "O nome é obrigatório"})
        return
    }if(!cargo){
        response.status(400).json({message: "O cargo é obrigatório"})
        return
    }

    const novoUsuario = {
        id: uuidv4(),
        nome, 
        cargo
    }
    usuarios.push(novoUsuario);
    response.status(201).json({ message: "Usuário cadastrado", novoUsuario });
})

app.patch("/usuarios/:id", (request, response) => {
    const { id } = request.params;
    const { nome, cargo } = request.body;

    const usuarioIndex = usuarios.find((usuario) => usuario.id === id);

    if (!usuarioIndex) {
        response.status(404).json({ message: "Usuário não encontrado" });
        return;
    } if(!nome){
        response.status(400).json({message: "O nome é obrigatório"})
        return
    } if(!cargo){
        response.status(400).json({message: "O cargo é obrigatório"})
        return
    }
    const updateUsuario = {
        id,
        nome,
        cargo
    }
    usuarios[usuarioIndex] = updateUsuario
    response.status(200).json({ message: "Usuário atualizado", updateUsuario });
})
 
app.delete("/usuarios/:id", (request, response) => {
    const id = request.params.id

    const indexUsuario = usuarios.findIndex(usuario => usuario.id === id)
    if(indexUsuario === -1){
        response.status(404).json({message: "Usuário não encontrado"})
        return
    }
    usuarios.splice(indexUsuario, 1)
    response.status(200).json({ message: "Usuário deletado" })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
