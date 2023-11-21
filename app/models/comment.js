/**
 * @fileoverview
 * Defines the Comments Model Schema for interacting with the 'comments' collection in MongoDB.
 */

import mongoose from "mongoose";

// Create a Schema object from mongoose.
const Schema = mongoose.Schema;

// Represents the structure of a comment in the 'comments' collection.
const CommentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},
{
    versionKey: false
});

// Create a Mongoose Model for the 'comments' collection
const CommentModel = mongoose.model('Comment', CommentSchema);

// Export the Post Model Schema for external use
export default CommentModel;