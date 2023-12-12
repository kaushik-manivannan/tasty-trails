/**
 * @fileoverview Defines the Express router for handling User API endpoints.
 */

import express from "express";
import * as userController from "../controllers/user-controller.js"
import {protect as auth}  from  "../middleware/authMiddleware.js";

const router = express.Router();
const authRouter = express.Router().use(auth);


router.post('/', userController.createUser); // Route for creating a new user
router.post('/login', userController.loginUser); // Route for user login
router.get('/login/failed', userController.loginFailure);
router.route('/:userId')
    .get(userController.getUserById) // Route for retrieving details of a specific user by its ID.
    .put(userController.updateUser) // Route for updating details of a specific user by its ID.
    .delete(userController.deleteUser) // Route for deleting a specific user by its ID.

export default router;