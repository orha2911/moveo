import { Request, Response } from 'express';
import { signUp, signIn, signOut} from "aws-amplify/auth"
import { handleError } from '../utils/errorHandler';

// Sign up a new user
export const userSignUp = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    try {
        const data = await signUp({
          username,
          password,
          options: {
            userAttributes: {
                'custom:role': role
              },
        },
        });
        res.status(201).json(data);
      } catch (error) {
        handleError(error, res);
    }
}

// Sign in a user
export const userSignIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await signIn({username, password});
    res.status(201).json(user);
  } catch (error) {
    handleError(error, res);
  }
}

// Sign out a user
export const userSignOut = async (req: Request, res: Response) => {
    try {
      await signOut();
      res.status(200).json({ message: 'Sign out success' });
    } catch (error) {
      handleError(error, res);
    }
}
