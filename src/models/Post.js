import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minLength: 5, 
        maxLength: 30, 
        required: true 
    },
    content: { 
        type: String, 
        minLength: 10, 
        required: true 
    },
    hashtags: { 
        type: [String] // Un arreglo de cadenas de texto
    },
    imageUrl: { 
        type: String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
});

const Post = mongoose.model("Post", postSchema);
export default Post;