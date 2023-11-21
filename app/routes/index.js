/**
 * @fileoverview Registers the Post API routes for the Express application.
 */

import postRouter from "../routes/post-routes.js"
import commentRouter from "../routes/comment-routes.js"

export default (app) => {
    app.use("/posts", postRouter); // Registers the Post API routes under the "/posts" endpoint.
    app.use("/comments", commentRouter); // Registers the Comment API routes under the "/comments" endpoint.
}