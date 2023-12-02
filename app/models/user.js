/**
 * @fileoverview
 * Defines the Post Model Schema for interacting with the 'posts' collection in MongoDB.
 */

import mongoose from "mongoose";

// Create a Schema object from mongoose.
const Schema = mongoose.Schema;

// Represents the structure of a post in the 'Users' collection.
const UserSchema = new Schema({
    emailId: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

// Create a Mongoose Model for the 'Users' collection
const UserModel = mongoose.model('User', UserSchema);

// Export the User Model Schema for external use
export default UserModel;