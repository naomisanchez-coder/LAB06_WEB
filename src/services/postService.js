import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        // Formatear hashtags si vienen como texto separado por comas
        let hashtagsArray = [];
        if (typeof postData.hashtags === "string" && postData.hashtags.trim() !== "") {
            hashtagsArray = postData.hashtags.split(",").map(tag => tag.trim());
        } else if (Array.isArray(postData.hashtags)) {
            hashtagsArray = postData.hashtags;
        }

        return await postRepository.create({ 
            ...postData, 
            user: userId,
            hashtags: hashtagsArray 
        });
    }

    async updatePost(postId, postData) {
        let hashtagsArray = [];
        if (typeof postData.hashtags === "string" && postData.hashtags.trim() !== "") {
            hashtagsArray = postData.hashtags.split(",").map(tag => tag.trim());
        }

        const dataToUpdate = { ...postData, updatedAt: Date.now() };
        if (hashtagsArray.length > 0) {
            dataToUpdate.hashtags = hashtagsArray;
        }

        return await postRepository.update(postId, dataToUpdate);
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async deletePost(postId) {
        return await postRepository.delete(postId);
    }
}

export default new PostService();