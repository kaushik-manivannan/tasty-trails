/**
 * @fileoverview
 * Defines the Post Model Schema for interacting with the 'posts' collection in MongoDB.
 */

import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
        required: false
    },
    image: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    }
},
{
    versionKey: false
});



/**
 * Compares a candidate password with the hashed password stored in the UserSchema.
 *
 * @param {string} candidatePassword - The candidate password to compare.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 * @throws {Error} Throws an error if there is an issue comparing the passwords.
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Create a Mongoose Model for the 'Users' collection
const UserModel = mongoose.model('User', UserSchema);

// Export the User Model Schema for external use
export default UserModel;