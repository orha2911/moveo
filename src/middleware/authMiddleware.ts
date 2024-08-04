import { Request, Response, NextFunction } from 'express';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { ADMIN } from '../utils/constants'

// Middleware to ensure the user is authenticated.
export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getCurrentUser();
    (req as any).user = user; // Attach the user object to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' }); // Authentication failed
  }
}

// Middleware to check if user is an admin
export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const userAttributes = await fetchUserAttributes();
  if (userAttributes['custom:role'] === ADMIN) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });  // Not an admin
  }
};