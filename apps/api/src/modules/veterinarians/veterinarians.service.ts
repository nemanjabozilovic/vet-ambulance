import { veterinariansRepository } from './veterinarians.repository';
import { Veterinarian } from '@prisma/client';

export const veterinariansService = {
  getAll: async (): Promise<Veterinarian[]> => {
    return veterinariansRepository.findAll();
  },
};

