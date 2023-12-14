import User from "../models/user.js";
import TastyTrialsError from "../errors/TastyTrialsError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../middleware/email.js";

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
        const existingUser = await User.findOne({ userName: newUserData.userName });
        if (existingUser) {
            return { user: existingUser, error: 'User already exists with the username' };
        }

        // Check if a user with the same email exists
        const existingEmailUser = await User.findOne({ emailId: newUserData.emailId });
        if (existingEmailUser) {
            return { user: existingEmailUser, error: 'Email already in use' };
        }

        // Hash the password before saving it to the database
        if(newUserData.password) {
            newUserData.password = await getHashedPassword(newUserData.password);
        } 

        const newUser = await User.create(newUserData);

        const token = generateAuthToken(newUser);

        sendEmail(newUser.emailId, newUser.userName);

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

        if (userData.password) {
            // Hash the password before updating
            const hashedPassword = await getHashedPassword(userData.password);
            userData.password = hashedPassword;
        }

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



/**
 * Authenticates a user by checking the provided username and password.
 *
 * @param {Object} userData - User data containing username and password.
 * @returns {Promise<Object>} An object containing the authenticated user and a JWT token.
 * @throws {Error} Throws an error if authentication fails.
 */
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
        if (error instanceof TastyTrialsError) { 
            throw error;
        } else {
            throw new Error('Error Loggin a user user');
        }
    }
};



/**
 * Authenticates a user based on the provided username and password.
 *
 * @param {string} userName - The username to authenticate.
 * @param {string} password - The password to authenticate.
 * @returns {Promise<Object>} The authenticated user.
 * @throws {TastyTrialsError} Throws an error if authentication fails.
 */
export const authenticateUser = async (userName, password) => {
    try {
        
        const user = await User.findOne({ userName });
        if(user) {
            const isPasswordValid = await user.comparePassword(password);
            if(!isPasswordValid) {
                throw new TastyTrialsError("Invalidpassword");
            }
        }

        return user;
    } catch (error) {
        throw new TastyTrialsError('Invalid Username or password');
    }
};


/**
 * Generates a JWT authentication token for a user.
 *
 * @param {Object} user - The user for whom the token is generated.
 * @returns {string} The generated JWT token.
 * @throws {TastyTrialsError} Throws an error if token generation fails.
 */
export const generateAuthToken = (user) => {
    try {
        // Assuming you have a secret key for signing the token
        const secretKey = process.env.JWT_SECRET;

        const payload = {
            user: {
                id: user._id,  
            },
        };

        // Sign the token with the payload, secret key, and any optional settings
        const token = jwt.sign(payload, secretKey, { expiresIn: '4h' }); 

        return token;
    } catch (error) {
        throw new TastyTrialsError('Error generating authentication token');
    }
};


/**
 * Generates a hashed password using bcrypt with a salt.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} The hashed password.
 */
const getHashedPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}