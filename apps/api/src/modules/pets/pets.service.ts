import { petsRepository } from './pets.repository';
import { CreatePetInput } from './pets.schemas';
import { PetWithVeterinarian } from './pets.types';
import { BadRequestError, NotFoundError } from '../../shared/errors';
import { veterinariansRepository } from '../veterinarians/veterinarians.repository';

async function findPetOrThrow(id: string): Promise<PetWithVeterinarian> {
  const pet = await petsRepository.findById(id);
  if (!pet) {
    throw new NotFoundError('Pet not found');
  }
  return pet;
}

export const petsService = {
  getAllActive: async (): Promise<PetWithVeterinarian[]> => {
    return petsRepository.findAllActive();
  },

  create: async (data: CreatePetInput): Promise<PetWithVeterinarian> => {
    const veterinarian = await veterinariansRepository.findById(data.veterinarianId);
    if (!veterinarian) {
      throw new NotFoundError('Veterinarian not found');
    }

    return petsRepository.create(data);
  },

  deactivate: async (id: string): Promise<PetWithVeterinarian> => {
    const pet = await findPetOrThrow(id);

    if (!pet.isActive) {
      throw new BadRequestError('Pet is already deactivated');
    }

    return petsRepository.deactivate(id);
  },

  vaccinate: async (id: string): Promise<PetWithVeterinarian> => {
    const pet = await findPetOrThrow(id);

    if (pet.isVaccinated) {
      throw new BadRequestError('Pet is already vaccinated.');
    }

    return petsRepository.vaccinate(id);
  },
};

