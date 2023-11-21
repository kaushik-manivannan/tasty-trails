import User from "../models/user.js";
import TastyTrialsError from "../errors/TastyTrialsError.js";

/**
 * Creates a new user.
 *
 * @param {Object} newUserData - The data for the new user.
 * @param {string} newUserData.name - The name of the user.
 * @param {string} newUserData.email - The email of the user.
 * @returns {Promise<Object>} A promise that resolves to the newly created user.
 * @throws {Error} If there is an error creating the user.
 */
export const createUser = async (newUserData) => {
    try {
        console.log("userName="+newUserData.userName);
        
        //Checking if the user already exists with the username
        const user = User.find({"userName":newUserData.userName});
        // if(user) {
        //     throw new TastyTrialsError('user name already exists');
        // }
        const newUser = await User.create(newUserData);
        return newUser;
    } catch (error) {

        if(error instanceof TastyTrialsError) {
            throw error;
        }
        else {
            throw new Error('Error creating user');
        }
    }
};

/**
 * Updates an existing user.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {Object} userData - The updated data for the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user.
 * @throws {Error} If the user is not found or there is an error updating the user.
 */
export const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

/**
 * Deletes an existing user.
 *
 * @param {string} userId - The ID of the user to delete.
 * @throws {Error} If the user is not found or there is an error deleting the user.
 */
export const deleteUser = async (userId) => {
    try {
        const deletedPost = await User.findByIdAndDelete(userId);
        if (!deletedPost) {
          throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Error deleting User');
    }
};

/**
 * Retrieves a user by ID.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user with the specified ID.
 * @throws {Error} If the user is not found or there is an error fetching the user.
 */
export const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching User by ID');
    }
};
