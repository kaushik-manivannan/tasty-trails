/**
 * @fileoverview
 * Defines functions to interact with the community model for CRUD operations.
 */

import CommunityModel from "../models/community.js";

/**
 * Retrieves all communities based on the provided parameters.
 *
 * @async
 * @function
 * @param {Object} [params={}] - Parameters to filter posts.
 * @returns {Promise<Array>} - A promise that resolves to an array of communities.
 * @throws {Error} - Throws an error if there is an issue fetching communities.
 */
export const getCommunities = async (params = {}) => {
  try {
    const communities = await CommunityModel.find(params).exec();
    return communities;
  } catch (error) {
    throw new Error("Error fetching communities");
  }
};

/**
 * Adds a new community to the database.
 *
 * @async
 * @function
 * @param {Object} newCommunityData - Data for the new community.
 * @returns {Promise<Object>} - A promise that resolves to the newly created community.
 * @throws {Error} - Throws an error if there is an issue creating the community.
 */

export const addNewCommunity = async (newCommunityData) => {
  try {
    const newCommunity = await CommunityModel.create(newCommunityData);
    return newCommunity;
  } catch (error) {
    throw new Error("Error creating community");
  }
};

/**
 * Retrieves a community by its ID.
 *
 * @async
 * @function
 * @param {string} communityId - ID of the community to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved community.
 * @throws {Error} - Throws an error if the community with the specified ID is not found or there is an issue fetching it.
 */

export const getCommunityById = async (communityId) => {
  try {
    const communtiy = await CommunityModel.findById(communityId);
    if (!communtiy) {
      throw new Error("community is not found");
    }
    return communtiy;
  } catch (error) {
    throw new Error("Error fetching community by ID");
  }
};

/**
 * Updates a community by its ID.
 *
 * @async
 * @function
 * @param {string} communityId - ID of the community to update.
 * @param {Object} communityData - Data to update the community.
 * @returns {Promise<Object>} - A promise that resolves to the updated community.
 * @throws {Error} - Throws an error if there is an issue updating the community or if the community with the specified ID is not found.
 */

export const updateCommunityById = async (communityId, communityData) => {
  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      communityId,
      communityData, { new: true }
    );
    return updatedCommunity;
  } catch (error) {
    throw new Error("Error updating community by ID");
  }
};

/**
 * Retrieves communities associated with a user based on their userId.
 *
 * @param {string} userId - The ID of the user for whom communities are to be retrieved.
 * @returns {Promise<Array>} - A promise that resolves to an array of communities associated with the user.
 * @throws {Error} - Throws an error if there's an issue fetching communities for the user.
 */

export const getUserCommunities = async(userId) =>{
  try {
    const communties = await CommunityModel.find({ members: userId });
    if (!communties) {
      throw new Error("No communites found");
    }
    return communties;
  } catch (error) {
    throw new Error("Error fetching communites for the user ID");
  }
}

/**
 * Adds a post to the specified community's postIds array.
 *
 * @param {string} communityId - The ID of the community to which the post will be added.
 * @param {string} postId - The ID of the post to be added.
 * @returns {Promise<object>} - A promise that resolves to the updated community object after adding the post.
 * @throws {Error} - Throws an error if there's an issue adding the post to the community.
 */

export const addPostToCommunity = async (communityId, postId) => {
  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      communityId,
      { $addToSet: { postIds: postId } }, { new: true }// Return the updated document
    );
    return updatedCommunity;
  } catch (error) {
    throw new Error("Error adding post to the community");
  }
}

/**
 * Removes a post from a community.
 *
 * @param {string} communityId - The ID of the community from which to remove the post.
 * @param {string} postId - The ID of the post to be removed from the community.
 * @returns {Promise<object|null>} A Promise that resolves to the updated community or null if not found.
 * @throws {Error} Throws an error if there is an issue removing the post from the community.
 */
export const removePostFromCommunity = async (communityId, postId) => {
  try {
    const updatedCommunity = await CommunityModel.findByIdAndUpdate(
      communityId,
      { $pull: { postIds: postId } }, { new: true }// Return the updated document
    );
    return updatedCommunity;
  } catch (error) {
    throw new Error("Error removing post from the community");
  } 
}
