/**
 * @fileoverview
 * Defines the Post Model Schema for interacting with the 'posts' collection in MongoDB.
 */

import mongoose from "mongoose";

// Create a Schema object from mongoose.
const Schema = mongoose.Schema;

// Represents the structure of a post in the 'posts' collection.
const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    communityId: {
        type: String,
    },
    availabilityStatus: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
});

// Create a Mongoose Model for the 'posts' collection
const PostModel = mongoose.model('Post', PostSchema);

// Export the Post Model Schema for external use
export default PostModel;