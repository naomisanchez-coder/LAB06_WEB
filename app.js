import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./src/db/database.js";
import dotenv from "dotenv";
import userRepository from "./src/repositories/userRepository.js";
import postRepository from "./src/repositories/postRepository.js";
import homeRoutes from "./src/routes/home.routes.js";
import postRoutes from "./src/routes/post.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));

app.use("/", homeRoutes);
app.use("/posts", postRoutes);

connectDB().then(async () => {
    try {
        let user = await userRepository.findByEmail("naomi.sanchez@tecsup.edu.pe");
        if (!user) {
            user = await userRepository.create({
                name: "Naomi",
                lastName: "Sanchez",
                email: "naomi.sanchez@tecsup.edu.pe",
                age: 20,
                password: "password123",
                phoneNumber: "902633254"
            });
        }

        const posts = await postRepository.findAll();
        if (posts.length === 0) {
            await postRepository.create({
                title: "Primer Post",
                content: "Contenido de prueba para el laboratorio",
                hashtags: ["tecsup", "node"],
                imageUrl: "https://image.com/test.jpg",
                user: user._id
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));