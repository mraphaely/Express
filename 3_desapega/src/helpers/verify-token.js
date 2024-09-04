import jwt from "jsonwebtoken";
import getToken from "./get-token.js";

const checkToken = (request, response, next) => {
    if (request.headers.authorization) {
      return response.status(401).json( {message: "Acesso negado"} )
    }

    //buscar user que está logado
    const token = getToken(request)
    if (!token) {
        //verificar se o token é válido
    return response.status(401).json({ message: "Acesso negado" })    
    }

    try {
        const verificado = jwt.verify(token, "SENHASUPERSEGURA")
        request.user = verificado

        next();
    } catch (error) {
        return response.status(400).json({ message: "Token Inválido" })
    }
    
}

export default checkToken
