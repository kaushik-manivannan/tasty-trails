import Post from "../models/post.js"

export const getAllPosts = async (params = {}) => {
    try {
        const posts = await Post.find(params).exec();
        return posts;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};

