import { prisma } from '../../infra/prisma/client';
import { CreatePetInput, UpdatePetInput } from './pets.schemas';
import { PetWithVeterinarian } from './pets.types';

const includeVeterinarian = {
  veterinarian: true,
} as const;

export const petsRepository = {
  findAllActive: async (): Promise<PetWithVeterinarian[]> => {
    return prisma.pet.findMany({
      where: {
        isActive: true,
      },
      include: includeVeterinarian,
      orderBy: {
        name: 'asc',
      },
    });
  },

  findById: async (id: string): Promise<PetWithVeterinarian | null> => {
    return prisma.pet.findUnique({
      where: { id },
      include: includeVeterinarian,
    });
  },

  create: async (data: CreatePetInput): Promise<PetWithVeterinarian> => {
    return prisma.pet.create({
      data: {
        name: data.name,
        ownerName: data.ownerName,
        birthDate: new Date(data.birthDate),
        isVaccinated: data.isVaccinated,
        imageUrl: data.imageUrl,
        veterinarianId: data.veterinarianId,
      },
      include: includeVeterinarian,
    });
  },

  deactivate: async (id: string): Promise<PetWithVeterinarian> => {
    return prisma.pet.update({
      where: { id },
      data: { isActive: false },
      include: includeVeterinarian,
    });
  },

  vaccinate: async (id: string): Promise<PetWithVeterinarian> => {
    return prisma.pet.update({
      where: { id },
      data: { isVaccinated: true },
      include: includeVeterinarian,
    });
  },

  update: async (id: string, data: UpdatePetInput): Promise<PetWithVeterinarian> => {
    return prisma.pet.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.ownerName && { ownerName: data.ownerName }),
        ...(data.birthDate && { birthDate: new Date(data.birthDate) }),
        ...(data.isVaccinated !== undefined && { isVaccinated: data.isVaccinated }),
        ...(data.imageUrl && { imageUrl: data.imageUrl }),
        ...(data.veterinarianId && { veterinarianId: data.veterinarianId }),
      },
      include: includeVeterinarian,
    });
  },
};

