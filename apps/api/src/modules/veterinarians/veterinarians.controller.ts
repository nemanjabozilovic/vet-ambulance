import { Request, Response, NextFunction } from 'express';
import { veterinariansService } from './veterinarians.service';

async function handleRequest<T>(
  handler: () => Promise<T>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await handler();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export const veterinariansController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    await handleRequest(() => veterinariansService.getAll(), res, next);
  },
};

