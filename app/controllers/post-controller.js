import * as postService from "../services/post-service.js";
import * as responses from "../controllers/response-handler.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        responses.setResponse(posts, res);
    } catch (err) {
        res.status(500)
        .json({ 
            code: "500",
            message: "Internal Server Error."
        });
    }
}

export const createPost = async (req, res) => {
    const postData = req.body;
    try {
        const newPost = await postService.createPost(postData);
        res.status(201).json(newPost);
    } catch (err) {
        responses.set400ErrorResponse(err, res);
    }
}

