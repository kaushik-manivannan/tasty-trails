/**
 * @fileoverview
 * Initializes and configures the Express application.
 */

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import registerRouter from "./routes/index.js"
import dotenv from "dotenv";

/**
 * @function initialize
 * @description Initializes the Express application with middleware and routes.
 * @param {object} app - The Express application instance.
 */
const initialize = async (app) => {
    app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
    app.use(express.urlencoded()); // Parse incoming URL-encoded requests
    app.use(express.json({ limit: '50mb' }));  // Parse incoming JSON requests
    dotenv.config();
    // Connect to the MongoDB database using Mongoose
    mongoose.connect("mongodb+srv://vijay:vijay@vijay.pu330la.mongodb.net/tasty-trails?retryWrites=true&w=majority");
    registerRouter(app); // Register routes for the application
}

// Export the initialize function for external use
export default initialize;
