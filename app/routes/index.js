/**
 * @fileoverview Registers the Post API routes for the Express application.
 */

import postRouter from "../routes/post-routes.js";
import CommunityRouter from "../routes/community-routes.js";

export default (app) => {
  app.use("/posts", postRouter); // Registers the Post API routes under the "/posts" endpoint.
  app.use("/communities", CommunityRouter); // Registers the Post API routes under the "/communities" endpoint.
};
