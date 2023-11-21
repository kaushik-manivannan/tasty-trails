/**
 * @fileoverview Contains Express route handlers for Post API endpoints.
 */

import * as postService from "../services/post-service.js";
import * as responses from "../controllers/response-handler.js";

const POST_NOT_FOUND_ERR_MSG = "Post Not found";

/**
 * Handles the retrieval of all posts.
 * 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        responses.setResponse(posts, res);
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
export const createPost = async (req, res) => {
    const postData = req.body;
    try {
        const newPost = await postService.createPost(postData);
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
export const getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await postService.getPostById(postId);
        responses.setResponse(post, res);
    } catch (err) {
        responses.set404ErrorResponse(err, res, POST_NOT_FOUND_ERR_MSG);
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
export const updatePost = async (req, res) => {
    const { postId } = req.params;
    const postData = req.body;
    try {
        const updatedPost = await postService.updatePost(postId, postData);
        responses.setResponse(updatedPost, res);
    } catch (err) {
        responses.set404ErrorResponse(err, res, POST_NOT_FOUND_ERR_MSG);
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
export const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        await postService.deletePost(postId);
        res.status(204).send();
    } catch (err) {
        responses.set404ErrorResponse(err, res, POST_NOT_FOUND_ERR_MSG);
    }
}