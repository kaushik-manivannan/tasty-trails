/**
 * @fileoverview Defines the Express router for handling User API endpoints.
 */

import express from "express";
import * as userController from "../controllers/user-controller.js"

const router = express.Router();


router.post('/', userController.createUser); // Route for creating a new user
router.route('/:userId')
    .get(userController.getUserById) // Route for retrieving details of a specific user by its ID.
    .put( userController.updateUser) // Route for updating details of a specific user by its ID.
    .delete(userController.deleteUser) // Route for deleting a specific user by its ID.

export default router;