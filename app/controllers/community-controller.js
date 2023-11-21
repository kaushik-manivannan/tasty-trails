/**
 * @fileoverview Contains Express route handlers for community API endpoints.
 */

import * as CommunityService from "../services/community-service.js";
import * as responses from "../controllers/response-handler.js";

/**
 * Handles the retrieval of all posts.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getCommunities = async (req, res) => {
  try {
    const communityData = req.body;
    const communities = await CommunityService.getCommunities(communityData);
    responses.setResponse(communities, res);
  } catch (err) {
    res.status(500).json({
      code: "500",
      message: "Internal Server Error.",
    });
  }
};
