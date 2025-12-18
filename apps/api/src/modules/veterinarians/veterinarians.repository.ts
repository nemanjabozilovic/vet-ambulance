import { prisma } from '../../infra/prisma/client';
import { Veterinarian } from '@prisma/client';

export const veterinariansRepository = {
  findAll: async (): Promise<Veterinarian[]> => {
    return prisma.veterinarian.findMany({
      orderBy: {
        lastName: 'asc',
      },
    });
  },

  findById: async (id: string): Promise<Veterinarian | null> => {
    return prisma.veterinarian.findUnique({
      where: { id },
    });
  },
};

