import { http } from '@/lib/http';
import { Pet, CreatePetInput } from './types';

export const petsApi = {
  getAll: async (): Promise<Pet[]> => {
    return http<Pet[]>('/api/pets');
  },

  create: async (data: CreatePetInput): Promise<Pet> => {
    return http<Pet>('/api/pets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  deactivate: async (id: string): Promise<Pet> => {
    return http<Pet>(`/api/pets/${id}/deactivate`, {
      method: 'PATCH',
    });
  },

  vaccinate: async (id: string): Promise<Pet> => {
    return http<Pet>(`/api/pets/${id}/vaccinate`, {
      method: 'PATCH',
    });
  },
};

