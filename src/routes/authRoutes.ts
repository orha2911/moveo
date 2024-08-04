/**
 * Authentication Routes:
 *   - POST /signup: Register a new user.
 *   - POST /signin: Sign in an existing user.
 *   - POST /signout: Sign out the current user.
 */

import express from 'express';
import { userSignUp, userSignIn, userSignOut } from '../controllers/authController';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/signout', userSignOut);

export default router;