import { Request, Response, NextFunction } from 'express';
import { petsService } from './pets.service';
import { createPetSchema, updatePetSchema } from './pets.schemas';
import { BadRequestError } from '../../shared/errors';

async function handleRequest<T>(
  handler: () => Promise<T>,
  res: Response,
  next: NextFunction,
  statusCode: number = 200
): Promise<void> {
  try {
    const result = await handler();
    res.status(statusCode).json(result);
  } catch (error) {
    next(error);
  }
}

function handleValidationError(error: unknown, next: NextFunction): void {
  if (error instanceof Error && error.name === 'ZodError') {
    next(new BadRequestError(error.message));
  } else {
    next(error);
  }
}

export const petsController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    await handleRequest(() => petsService.getAllActive(), res, next);
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createPetSchema.parse(req.body);
      await handleRequest(() => petsService.create(validatedData), res, next, 201);
    } catch (error) {
      handleValidationError(error, next);
    }
  },

  deactivate: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await handleRequest(() => petsService.deactivate(id), res, next);
  },

  vaccinate: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await handleRequest(() => petsService.vaccinate(id), res, next);
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validatedData = updatePetSchema.parse(req.body);
      await handleRequest(() => petsService.update(id, validatedData), res, next);
    } catch (error) {
      handleValidationError(error, next);
    }
  },
};

