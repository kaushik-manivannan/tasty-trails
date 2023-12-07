/**
 * @fileoverview
 * Defines functions to interact with the Comment model for CRUD operations.
 */

import Comment from "../models/comment.js"

/**
 * Creates a new comment with the provided data.
 *
 * @async
 * @function
 * @param {Object} newCommentData - Data for the new comment.
 * @returns {Promise<Object>} - A promise that resolves to the newly created comment.
 * @throws {Error} - Throws an error if there is an issue creating the comment.
 */
export const createComment = async (newCommentData) => {
    try {
        const newComment = await Comment.create(newCommentData);
        return newComment;
    } catch (error) {
        throw new Error('Error creating comment');
    }
};

/**
 * Retrieves a comment by its unique identifier (commentId).
 *
 * @async
 * @function
 * @param {string} postId - The unique identifier of the Comment.
 * @returns {Promise<Object>} - A promise that resolves to the comment with the given ID.
 * @throws {Error} - Throws an error if the comment is not found or there is an issue fetching it.
 */
export const getCommentById = async (postId) => {
    try {
        const comment = await Comment.find({ postId: postId });
        if (!comment) {
          throw new Error('Comment not found');
        }
        return comment;
    } catch (error) {
        throw new Error('Error fetching comment by ID');
    }
};

/**
 * Updates the details of a comment with the provided data.
 *
 * @async
 * @function
 * @param {string} commentId - The unique identifier of the comment to update.
 * @param {Object} newCommentData - Data to update the comment.
 * @returns {Promise<Object>} - A promise that resolves to the updated comment.
 * @throws {Error} - Throws an error if the comment is not found or there is an issue updating it.
 */
export const updateComment = async (commentId, newCommentData) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, newCommentData, { new: true });
        if (!updatedComment) {
          throw new Error('Comment not found');
        }
        return updatedComment;
    } catch (error) {
        throw new Error('Error updating comment');
    }
};

/**
 * Deletes a comment with the provided unique identifier (commentId).
 *
 * @async
 * @function
 * @param {string} commentId - The unique identifier of the comment to delete.
 * @throws {Error} - Throws an error if the comment is not found or there is an issue deleting it.
 */
export const deleteComment = async (commentId) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
          throw new Error('Comment not found');
        }
    } catch (error) {
        throw new Error('Error deleting comment');
    }
};