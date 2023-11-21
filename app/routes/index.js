import postRouter from "../routes/post-routes.js"

export default (app) => {
    app.use("/posts", postRouter);
}