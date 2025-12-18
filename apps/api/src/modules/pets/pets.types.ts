import { Pet } from '@prisma/client';

export type PetWithVeterinarian = Pet & {
  veterinarian: {
    id: string;
    firstName: string;
    lastName: string;
    specialty: string;
  };
};

