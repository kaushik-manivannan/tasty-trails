/**
 * @fileoverview Defines the Express router for handling community API endpoints.
 */

import express from "express";
import * as CommunityController from "../controllers/community-controller.js";
import {protect as auth}  from  "../middleware/authMiddleware.js";

const router = express.Router();
router.use(auth);
router.get("/", CommunityController.getCommunities); // Route for retrieving  communities
router.post("/", CommunityController.addNewCommunity); // Route for adding a new community
router.get("/:id", CommunityController.getCommunityById); // Route for geting a community by id
router.put("/:id", CommunityController.updateCommunity); // Route for updating a community

export default router;
