import express from "express";
import {googleCallback, initiateGoogleAuth}  from "../controllers/google-auth-controller.js";


const router = express.Router();

router.get("/google/callback", googleCallback); // Route for handling the Google OAuth callback
router.get("/google", initiateGoogleAuth); // Route for initiating the Google OAuth process

export default router;