/**
 * @file server.js
 * @description Entry point for the Tasty Trails Node.js server.
 */

import express from "express";
import initialize from "./app/app.js";

// Creating an Express application
const app = express();

// Setting the port for the server to listen on
const port = 3000;

/**
 * @function initialize
 * @description Initializes the Express application with middleware and routes.
 * @param {object} app - The Express application instance.
 */
initialize(app);

/**
 * @description Starts the server and listens for incoming requests.
 */
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
