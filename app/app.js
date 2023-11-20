import cors from "cors";
import express from "express";

// Middleware Operations
const initialize = async (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    //TODO: MongoDB Connection
    //TODO: Initialize Routes
}

export default initialize;
