import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", (req, res) => postController.getAll(req, res));
router.post("/create", (req, res) => postController.create(req, res));
router.get("/edit/:id", (req, res) => postController.editForm(req, res));
router.post("/update/:id", (req, res) => postController.update(req, res));
router.get("/delete/:id", (req, res) => postController.delete(req, res));

export default router;