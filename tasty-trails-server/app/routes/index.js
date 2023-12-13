/**
 * @fileoverview Registers the Post API routes for the Express application.
 */

import postRouter from "./post-routes.js"
import commentRouter from "./comment-routes.js"
import communityRouter from "./community-routes.js"
import userRouter from "./user-routes.js"
import googleOAuthRouter from "./google-oauth-routes.js";

export default (app) => {
    app.use("/posts", postRouter); // Registers the Post API routes under the "/posts" endpoint.
    app.use("/comments", commentRouter); // Registers the Comment API routes under the "/comments" endpoint.
    app.use("/communities", communityRouter); // Registers the Community API routes under the "/communities" endpoint.
    app.use("/users", userRouter.router); // Registers the User API routes under the "/users" endpoint.
    app.use("/users", userRouter.authRouter); // Registers the User API routes under the "/users" endpoint.
    app.use("/auth",googleOAuthRouter); // Register routes for google oauth
}
