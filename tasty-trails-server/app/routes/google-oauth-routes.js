import express from "express";
import passport from "passport";
import {googleCallback, initiateGoogleAuth}  from "../controllers/google-auth-controller.js";


const router = express.Router();

router.get("/google/callback", googleCallback);
router.get("/google", initiateGoogleAuth);

export default router;