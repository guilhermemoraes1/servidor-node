import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// configura o armazenamento do Multer no windows para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname);
    }
})

// Cria uma instância do middleware Multer
const upload = multer({ dest: "./uploads" , storage})

// Define as rotas usando o objeto Express app
const routes = app => {
    // Permite que o servidor interprete corpos de requisições no formato JSON
    app.use(express.json());

    app.use(cors(corsOptions));
    // Rota para recuperar uma lista de todos os posts
    app.get("/posts", listarPosts);
    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);
    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;