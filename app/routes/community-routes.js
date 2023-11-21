/**
 * @fileoverview Defines the Express router for handling community API endpoints.
 */

import express from "express";
import * as CommunityController from "../controllers/community-controller.js";

const router = express.Router();

router.get("/", CommunityController.getCommunities); // Route for retrieving  communities

export default router;
