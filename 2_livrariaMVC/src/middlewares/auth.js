import JWT from "jsonwebtoken";

export const Auth = {
    private: async (request, response, next) => {
        let sucess = false;
        //fazer verificação
        if(request.headers.authorization) {
            const [AuthType, token] = request.headers.authorization.split(' ')
            if(AuthType === 'Bearer') {
              try {
                 JWT.verify(token, process.env.JWT_SECRET_KEY);
                 sucess = true;
                } catch (err){
                    sucess = false;
                }
            }
        }
        if(sucess) {
            next();
        }else {
            response.status(403);//Não permitido
            response.json({Error: 'Não autorizado'});
        }
    }
}