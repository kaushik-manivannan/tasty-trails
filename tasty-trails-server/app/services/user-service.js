import User from "../models/user.js";
import TastyTrialsError from "../errors/TastyTrialsError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        const user = await User.findOne({ userName: newUserData.userName });
        if (user) {
            throw new TastyTrialsError('User name already exists');
        }

        // Hash the password before saving it to the database
        newUserData.password = await bcrypt.hash(newUserData.password, 10);

        const newUser = await User.create(newUserData);

        const token = generateAuthToken(newUser);

        return { user: newUser, token };
    } catch (error) {
        if (error instanceof TastyTrialsError) {
            throw error;
        } else {
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


export const loginUser = async (userData) => {
    try {
        // Assuming you have a function to authenticate the user in your service
        const user = await authenticateUser(userData.userName, userData.password);
        if (!user) {
            throw new TastyTrialsError('Invalid username or password');
        }

        // Generate a JWT token for authentication
        const token = generateAuthToken(user);

        return { user, token };
    } catch (error) {
        throw new Error('Error during login');
    }
};

export const authenticateUser = async (userName, password) => {
    try {
        const user = await User.findOne({ userName });

        if (!user) {
            throw new TastyTrialsError('User not found');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new TastyTrialsError('Incorrect password');
        }

        return user;
    } catch (error) {
        throw new TastyTrialsError('Error authenticating user');
    }
};



export const generateAuthToken = (user) => {
    try {
        // Assuming you have a secret key for signing the token
        const secretKey = '1234';

        const payload = {
            user: {
                id: user._id, // Assuming your user model has an '_id' field
                userName: user.userName,
                
            },
        };

        // Sign the token with the payload, secret key, and any optional settings
        const token = jwt.sign(payload, secretKey, { expiresIn: '4h' }); // Token expires in 1 hour

        return token;
    } catch (error) {
        throw new TastyTrialsError('Error generating authentication token');
    }
};