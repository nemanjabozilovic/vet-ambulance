import { z } from 'zod';

export const createPetSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  ownerName: z.string().min(1, 'Owner name is required').max(100),
  birthDate: z.string().datetime().refine(
    (date) => new Date(date) <= new Date(),
    'Birth date cannot be in the future'
  ),
  isVaccinated: z.boolean().default(false),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  veterinarianId: z.string().uuid('Veterinarian ID must be a valid UUID'),
});

export type CreatePetInput = z.infer<typeof createPetSchema>;

export const updatePetSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  ownerName: z.string().min(1, 'Owner name is required').max(100).optional(),
  birthDate: z.string().datetime().refine(
    (date) => new Date(date) <= new Date(),
    'Birth date cannot be in the future'
  ).optional(),
  isVaccinated: z.boolean().optional(),
  imageUrl: z.string().url('Image URL must be a valid URL').optional(),
  veterinarianId: z.string().uuid('Veterinarian ID must be a valid UUID').optional(),
});

export type UpdatePetInput = z.infer<typeof updatePetSchema>;

