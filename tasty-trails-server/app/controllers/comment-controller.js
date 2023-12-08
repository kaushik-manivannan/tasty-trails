/**
 * @fileoverview Contains Express route handlers for Comment API endpoints.
 */

import * as commentService from "../services/comment-service.js";
import * as responses from "./response-handler.js";

/**
 * Handles the creation of a new comment for a post.
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
        res.status(201).json(newComment);
    } catch (err) {
        responses.set400ErrorResponse(err, res);
    }
}

/**
 * Handles the retrieval of a comment for a post.
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
        // responses.set404ErrorResponse(err, res);
        res.status(404)
        .json({ 
            code: "404",
            message: "Comment not found."
        });
    }
}

/**
 * Handles the update of a comment by its identifier.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const commentData = req.body;
    try {
        const updatedComment = await commentService.updateComment(commentId, commentData);
        responses.setResponse(updatedComment, res);
    } catch (err) {
        // responses.set404ErrorResponse(err, res);
        res.status(404)
        .json({ 
            code: "404",
            message: "Comment not found."
        });
    }
}

/**
 * Handles the deletion of a comment by its identifier.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        await commentService.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
        // .json({ 
        //     message: "Comment successfully deleted."
        // });
    } catch (err) {
        // responses.set404ErrorResponse(err, res);
        res.status(404)
        .json({ 
            code: "404",
            message: "Comment not found."
        });
    }
}