/**
 * @fileoverview
 * Initializes and configures the Express application.
 */

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import registerRouter from "./routes/index.js"
import dotenv from "dotenv";
import passport from "./middleware/googleAuth.js";


/**
 * @function initialize
 * @description Initializes the Express application with middleware and routes.
 * @param {object} app - The Express application instance.
 */
const initialize = async (app) => {
    dotenv.config();
    app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
    app.use(express.urlencoded()); // Parse incoming URL-encoded requests
    app.use(express.json({ limit: '50mb' }));  // Parse incoming JSON requests
    app.use(passport.initialize());
    //app.use(passport.session());
    // Connect to the MongoDB database using Mongoose
    mongoose.connect("mongodb+srv://ramachandranshr:HEyzsgy2j0dkTkWi@mongoatlas1.rnu9y.mongodb.net/tasteyTrialsDB?retryWrites=true&w=majority");
    registerRouter(app); // Register routes for the application
}

// Export the initialize function for external use
export default initialize;
