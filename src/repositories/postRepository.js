import Post from "../models/Post.js";

const postRepository = {
    // Crear un nuevo post con las validaciones del modelo
    create: async (postData) => {
        return await Post.create(postData);
    },

    // Actualizar un post existente validando minLength/maxLength
    update: async (id, postData) => {
        return await Post.findByIdAndUpdate(
            id, 
            { ...postData, updatedAt: Date.now() }, 
            { new: true, runValidators: true }
        );
    },

    // Obtener todos los posts con la información del usuario (age, email, etc.)
    findAll: async () => {
        return await Post.find().populate("user");
    },

    // Buscar un post específico por su ID
    findById: async (id) => {
        return await Post.findById(id).populate("user");
    },

    // Buscar posts de un usuario específico (requerido por tu PostService)
    findByUser: async (userId) => {
        return await Post.find({ user: userId }).populate("user");
    },

    // Eliminar un post de la base de datos
    delete: async (id) => {
        return await Post.findByIdAndDelete(id);
    }
};

export default postRepository;