/**
 * @fileoverview
 * Defines functions to interact with the Post model for CRUD operations.
 */

import Post from "../models/post.js"

/**
 * Retrieves all posts based on the provided parameters.
 *
 * @async
 * @function
 * @param {Object} [params={}] - Parameters to filter posts.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 * @throws {Error} - Throws an error if there is an issue fetching posts.
 */
export const getAllPosts = async (params = {"communityId":"-1"}) => {
    try {
        const posts = await Post.find(params).exec();
        return posts;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};

/**
 * Creates a new post with the provided data.
 *
 * @async
 * @function
 * @param {Object} newPostData - Data for the new post.
 * @returns {Promise<Object>} - A promise that resolves to the newly created post.
 * @throws {Error} - Throws an error if there is an issue creating the post.
 */
export const createPost = async (newPostData) => {
    try {
        const newPost = await Post.create(newPostData);
        return newPost;
    } catch (error) {
        throw new Error('Error creating post');
    }
};

/**
 * Retrieves a post by its unique identifier (postId).
 *
 * @async
 * @function
 * @param {string} postId - The unique identifier of the post.
 * @returns {Promise<Object>} - A promise that resolves to the post with the given ID.
 * @throws {Error} - Throws an error if the post is not found or there is an issue fetching it.
 */
export const getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        throw new Error('Error fetching post by ID');
    }
};

/**
 * Updates the details of a post with the provided data.
 *
 * @async
 * @function
 * @param {string} postId - The unique identifier of the post to update.
 * @param {Object} newPostData - Data to update the post.
 * @returns {Promise<Object>} - A promise that resolves to the updated post.
 * @throws {Error} - Throws an error if the post is not found or there is an issue updating it.
 */
export const updatePost = async (postId, newPostData) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, newPostData, { new: true });
        if (!updatedPost) {
          throw new Error('Post not found');
        }
        return updatedPost;
    } catch (error) {
        throw new Error('Error updating post');
    }
};

/**
 * Deletes a post with the provided unique identifier (postId).
 *
 * @async
 * @function
 * @param {string} postId - The unique identifier of the post to delete.
 * @throws {Error} - Throws an error if the post is not found or there is an issue deleting it.
 */
export const deletePost = async (postId) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
          throw new Error('Post not found');
        }
    } catch (error) {
        throw new Error('Error deleting post');
    }
};

/**
 * Retrieves an array of posts based on their unique IDs.
 *
 * @param {string[]} postIds - An array of post IDs to retrieve.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of posts.
 * @throws {Error} If there is an error during the database query.
 */
export const getPostsByIds = async (postIds) => {
    try {
      const posts = await Post.find({ _id: { $in: postIds } }).exec();
      return posts;
    } catch (error) {
      throw new Error('Error fetching posts by IDs');
    }
};
  