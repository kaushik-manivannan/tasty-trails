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

export const addNewCommunity = async (newCommunityData) => {
  try {
    const newCommunity = await CommunityModel.create(newCommunityData);
    return newCommunity;
  } catch (error) {
    throw new Error("Error creating community");
  }
};

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
