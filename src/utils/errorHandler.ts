import { Response } from 'express';

export function handleError(error: unknown, res: Response): void {
  if (error instanceof Error) {
    // Handle known Error type
    res.status(500).json({ error: error.message });
  } else {
    // Handle unknown error type
    res.status(500).json({ error: 'An unknown error occurred' });
  }
}
