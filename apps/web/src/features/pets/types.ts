import { Veterinarian } from '../veterinarians/types';

export interface Pet {
  id: string;
  name: string;
  ownerName: string;
  birthDate: string;
  isVaccinated: boolean;
  imageUrl: string;
  isActive: boolean;
  veterinarianId: string;
  veterinarian: Veterinarian;
}

export interface CreatePetInput {
  name: string;
  ownerName: string;
  birthDate: string;
  isVaccinated: boolean;
  imageUrl: string;
  veterinarianId: string;
}

export interface UpdatePetInput {
  name?: string;
  ownerName?: string;
  birthDate?: string;
  isVaccinated?: boolean;
  imageUrl?: string;
  veterinarianId?: string;
}

