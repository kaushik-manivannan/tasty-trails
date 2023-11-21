import express from "express";
import * as postController from "../controllers/post-controller.js"

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

export default router;