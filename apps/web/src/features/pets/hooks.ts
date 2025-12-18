import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { petsApi } from './api';
import { CreatePetInput } from './types';

export const usePets = () => {
  return useQuery({
    queryKey: ['pets'],
    queryFn: () => petsApi.getAll(),
  });
};

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePetInput) => petsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
};

export const useDeactivatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => petsApi.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
};

export const useVaccinatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => petsApi.vaccinate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
};

