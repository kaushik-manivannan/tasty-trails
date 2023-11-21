/**
 * @fileoverview Registers the Post API routes for the Express application.
 */

import postRouter from "../routes/post-routes.js"

export default (app) => {
    app.use("/posts", postRouter); // Registers the Post API routes under the "/posts" endpoint.
}