import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    // Listar todos los posts
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // Crear nuevo post
    async create(req, res) {
        try {
            // Usamos el ID de Sayuri que ya existe en tu DB para las pruebas
            const user = await userRepository.findByEmail("sayuri.travezano@tecsup.edu.pe");
            await postService.createPost(user._id, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send("Error al crear: " + error.message);
        }
    }

    // Mostrar formulario de edición
    async editForm(req, res) {
        try {
            const posts = await postService.getPosts();
            const post = posts.find(p => p._id.toString() === req.params.id);
            res.render("editPost", { post });
        } catch (error) {
            res.status(404).send("Post no encontrado");
        }
    }

    // Actualizar post
    async update(req, res) {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send("Error al actualizar: " + error.message);
        }
    }

    // Eliminar post
    async delete(req, res) {
        try {
            // Nota: En formularios HTML simples usamos GET o POST para borrar
            await postRepository.delete(req.params.id); // Asegúrate de tener delete en tu repo
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new PostController();