/**
 * @fileoverview Defines the Express router for handling Post API endpoints.
 */

import express from "express";
import * as commentController from "../controllers/comment-controller.js"

const router = express.Router();

// router.get('/', commentController.getAllComments);
router.post('/', commentController.createComment);
router.get('/:postId', commentController.getCommentByPostId);
router.put('/:postId', commentController.updateComment);
router.delete('/:postId', commentController.deleteComment);

export default router;