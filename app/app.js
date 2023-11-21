import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import registerRouter from "./routes/index.js"

// Middleware Operations
const initialize = async (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    //TODO: MongoDB Connection
    //TODO: Initialize Routes
    mongoose.connect("mongodb+srv://manivannank:efbhxkLZmlAruvYf@kaushik-manivannan.7qyuxhq.mongodb.net/tasty-trails?retryWrites=true&w=majority");
    registerRouter(app);
}

export default initialize;
