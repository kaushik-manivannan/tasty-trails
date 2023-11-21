/**
 * @fileoverview Defines the Express router for handling Post API endpoints.
 */

import express from "express";
import * as postController from "../controllers/post-controller.js"

const router = express.Router();


router.get('/', postController.getAllPosts); // Route for retrieving all posts
router.post('/', postController.createPost); // Route for creating a new post
router.get('/:postId', postController.getPostById); // Route for retrieving details of a specific post by its ID.
router.put('/:postId', postController.updatePost); // Route for updating details of a specific post by its ID.
router.delete('/:postId', postController.deletePost); // Route for deleting a specific post by its ID.

export default router;