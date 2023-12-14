/**
 * @fileoverview Defines the Express router for handling User API endpoints.
 */

import express from "express";
import * as userController from "../controllers/user-controller.js"
import {protect as auth}  from  "../middleware/authMiddleware.js";

const router = express.Router();
const authRouter = express.Router();


router.post('/', userController.createUser); // Route for creating a new user
router.post('/login', userController.loginUser); // Route for user login
router.route('/:userId')
authRouter.use(auth).route('/:userId')
    .get(userController.getUserById) // Route for retrieving details of a specific user by its ID.
    .get('/communities',userController.getUserCommunities) // Route for retrieving communites of a specific user's communities
    .put(userController.updateUser) // Route for updating details of a specific user by its ID.
    .delete(userController.deleteUser) // Route for deleting a specific user by its ID.


export default { router, authRouter};