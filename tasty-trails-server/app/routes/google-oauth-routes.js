import express from "express";
import passport from "passport";


const router = express.Router();

router.get("/google/callback", passport.authenticate("google",{
    successRedirect: 'http://localhost:3000/',
    failureRedirect: "users/login/failed",
}));
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

export default router;