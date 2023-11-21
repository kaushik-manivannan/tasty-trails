/**
 * @module app/app
 * @description Initializes and configures the Express application.
 */

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import registerRouter from "./routes/index.js"

/**
 * @function initialize
 * @description Initializes the Express application with middleware and routes.
 * @param {object} app - The Express application instance.
 */
const initialize = async (app) => {
    app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
    app.use(express.urlencoded()); // Parse incoming URL-encoded requests
    app.use(express.json()); // Parse incoming JSON requests
    // Connect to the MongoDB database using Mongoose
    mongoose.connect("mongodb+srv://manivannank:efbhxkLZmlAruvYf@kaushik-manivannan.7qyuxhq.mongodb.net/tasty-trails?retryWrites=true&w=majority");
    registerRouter(app);
}

// Export the initialize function for external use
export default initialize;
