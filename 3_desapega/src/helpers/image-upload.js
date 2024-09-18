import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//estruturar onde vou guardar as imagens
const imageStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        let folder = "";

        if (request.baseUrl.includes("usuarios")) {
            folder = "usuarios";
        } else if (request.baseUrl.includes("objetos")) {
            folder = "objetos";
        }
        callback(null, path.join(__dirname, `../public/${folder}`));
    },
    filename: (request, file, callback) => {
        //nome do arquivo
        callback(null, Date.now() + String(Math.floor(Math.random() * 10000)) +
            path.extname(file.originalname)
        );
    }
});
//executar a função para guardar imagem
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(request, file, callback){
        if ( !file.originalname.match(/\.(png||jpg||jpeg)$/) ) {
          return callback(new Error ("Por favor, envie apenas jpg ou png!"));
        }
        callback(null, true);  
    }
});

export default imageUpload;