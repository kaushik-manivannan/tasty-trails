/**
 * @fileoverview Defines the Express router for handling Post API endpoints.
 */

import express from "express";
import * as postController from "../controllers/post-controller.js";
import {protect as auth}  from  "../middleware/authMiddleware.js";

const router = express.Router();


router.use(auth).get('/', postController.getAllPosts); // Route for retrieving all posts
router.use(auth).post('/', postController.createPost); // Route for creating a new post
router.use(auth).get('/:postId', postController.getPostById); // Route for retrieving details of a specific post by its ID.
router.use(auth).put('/:postId', postController.updatePost); // Route for updating details of a specific post by its ID.
router.use(auth).delete('/:postId', postController.deletePost); // Route for deleting a specific post by its ID.

export default router;