import { useQuery } from '@tanstack/react-query';
import { veterinariansApi } from './api';

export const useVeterinarians = () => {
  return useQuery({
    queryKey: ['veterinarians'],
    queryFn: () => veterinariansApi.getAll(),
  });
};

