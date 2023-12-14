// Importing user service and response handler modules
import * as userService from "../services/user-service.js";
import * as responses from "./response-handler.js";
import TastyTrialsError from "../errors/TastyTrialsError.js";
import * as CommunityService from "../services/community-service.js";

// Constant for user not found error message
const USER_NOT_FOUND_ERR_MSG = "User Not found";

/**
 * Creates a new user based on the request body.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const createUser = async (req, res) => {
    // Extracting user data from the request body
    const userData = req.body;
    try {
        const newUser = await userService.createUser(userData);
        res.status(200).json(newUser);
    } 
    catch (err) {

        if(err instanceof TastyTrialsError){
            responses.setResponse(err.message, res);
        }
            
        else{
            responses.set400ErrorResponse(err, res);
        } 
    }
}

/**
 * Updates an existing user based on the provided user ID and request body.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const updateUser = async (req, res) => {

    const { userId } = req.params;
    const userData = req.body;
    try {
       
        const updatedUser = await userService.updateUser(userId, userData);
        responses.setResponse(updatedUser, res);
    } catch (err) {
        responses.set404ErrorResponseWithMsg(err, res, USER_NOT_FOUND_ERR_MSG);
    }
}

/**
 * Deletes an existing user based on the provided user ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const deleteUser = async (req, res) => {
    
    const { userId } = req.params;
    try {
        await userService.deleteUser(userId);
        responses.setResponseData(204, res, "User Deleted Sucessfully");

    } catch (err) {
        responses.set404ErrorResponseWithMsg(err, res, USER_NOT_FOUND_ERR_MSG);
    }
}

/**
 * Retrieves a user based on the provided user ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getUserById(userId);
        responses.setResponse(user, res);
    } catch (err) {
        responses.set404ErrorResponseWithMsg(err, res, USER_NOT_FOUND_ERR_MSG);
    }
}


/**
 * Authenticates a user based on the provided username and password.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const loginUser = async (req, res) => {
    const userData = req.body;
    try {
        const { user, token } = await userService.loginUser(userData);
        res.status(200).json({ user, token });
    } catch (err) {
        responses.set401ErrorResponse(res, err.message);
    }
};

/**
 * Controller method to retrieve communities associated with a user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

export const getUserCommunities = async (req, res) => {
    const { userId } = req.params;
    try {
        const communites = await CommunityService.getUserCommunities(userId);
        responses.setResponse(communites, res);
    } catch (err) {
        responses.set404ErrorResponseWithMsg(err, res);
    }
}