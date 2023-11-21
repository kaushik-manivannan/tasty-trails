/**
 * @fileoverview Contains Express route handlers for Post API endpoints.
 */

import * as commentService from "../services/comment-service.js";
import * as responses from "../controllers/response-handler.js";

/**
 * Handles the retrieval of all comments for a paticular post.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        responses.setResponse(comments, res);
    } catch (err) {
        res.status(500)
        .json({ 
            code: "500",
            message: "Internal Server Error."
        });
    }
}

/**
 * Handles the creation of a new post.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const createComment = async (req, res) => {
    const commentData = req.body;
    try {
        const newComment = await commentService.createComment(commentData);
        res.status(201).json(newPost);
    } catch (err) {
        responses.set400ErrorResponse(err, res);
    }
}

/**
 * Handles the retrieval of a post by its identifier.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getCommentById = async (req, res) => {
    const { postId } = req.params;
    try {
        const comment = await commentService.getCommentById(postId);
        responses.setResponse(comment, res);
    } catch (err) {
        responses.set404ErrorResponse(err, res);
    }
}

/**
 * Handles the update of a post by its identifier.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const updateComment = async (req, res) => {
    const { postId } = req.params;
    const commentData = req.body;
    try {
        const updatedComment = await commentService.updateComment(postId, commentData);
        responses.setResponse(updatedComment, res);
    } catch (err) {
        responses.set404ErrorResponse(err, res);
    }
}

/**
 * Handles the deletion of a post by its identifier.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        await commentService.deletePost(commentId);
        res.status(204).send();
    } catch (err) {
        responses.set404ErrorResponse(err, res);
    }
}