import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");
        return await postRepository.create({ ...postData, user: userId });
    }

    async updatePost(postId, postData) {
        // Al actualizar, Mongoose validará automáticamente minLength y maxLength
        return await postRepository.update(postId, { ...postData, updatedAt: Date.now() });
    }

    async getPosts() {
        return await postRepository.findAll();
    }
}

export default new PostService();