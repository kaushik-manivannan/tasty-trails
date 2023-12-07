/**
 * @fileoverview Defines the Express router for handling Comment API endpoints.
 */

import express from "express";
import * as commentController from "../controllers/comment-controller.js"

const router = express.Router();

router.get('/:postId', commentController.getCommentById);
router.post('/', commentController.createComment);
// router.get('/:commentId', commentController.getCommentById);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

export default router;