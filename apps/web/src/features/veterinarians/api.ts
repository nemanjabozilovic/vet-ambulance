import { http } from '@/lib/http';
import { Veterinarian } from './types';

export const veterinariansApi = {
  getAll: async (): Promise<Veterinarian[]> => {
    return http<Veterinarian[]>('/api/veterinarians');
  },
};

