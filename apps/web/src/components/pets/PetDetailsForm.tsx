import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pet, UpdatePetInput } from '@/features/pets/types';
import { useUpdatePet } from '@/features/pets/hooks';
import { useVeterinarians } from '@/features/veterinarians/hooks';

const updatePetSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  ownerName: z.string().min(1, 'Owner name is required').optional(),
  birthDate: z.string().optional(),
  isVaccinated: z.boolean().optional(),
  imageUrl: z.string().url('Image URL must be a valid URL').optional(),
  veterinarianId: z.string().min(1, 'Veterinarian is required').optional(),
});

type UpdatePetFormData = z.infer<typeof updatePetSchema>;

interface PetDetailsFormProps {
  pet: Pet;
  onSuccess?: () => void;
}

export function PetDetailsForm({ pet, onSuccess }: PetDetailsFormProps) {
  const { data: veterinarians = [], isLoading: veterinariansLoading } = useVeterinarians();
  const updatePet = useUpdatePet();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdatePetFormData>({
    resolver: zodResolver(updatePetSchema),
    defaultValues: {
      name: pet.name,
      ownerName: pet.ownerName,
      birthDate: format(new Date(pet.birthDate), 'yyyy-MM-dd'),
      isVaccinated: pet.isVaccinated,
      imageUrl: pet.imageUrl,
      veterinarianId: pet.veterinarianId,
    },
  });

  const veterinarianId = watch('veterinarianId');
  const isVaccinated = watch('isVaccinated');

  const onSubmit = async (data: UpdatePetFormData) => {
    try {
      const payload: UpdatePetInput = {
        ...(data.name && data.name !== pet.name && { name: data.name }),
        ...(data.ownerName && data.ownerName !== pet.ownerName && { ownerName: data.ownerName }),
        ...(data.birthDate &&
          data.birthDate !== format(new Date(pet.birthDate), 'yyyy-MM-dd') && {
            birthDate: new Date(data.birthDate).toISOString(),
          }),
        ...(data.isVaccinated !== undefined &&
          data.isVaccinated !== pet.isVaccinated && { isVaccinated: data.isVaccinated }),
        ...(data.imageUrl && data.imageUrl !== pet.imageUrl && { imageUrl: data.imageUrl }),
        ...(data.veterinarianId &&
          data.veterinarianId !== pet.veterinarianId && { veterinarianId: data.veterinarianId }),
      };

      if (Object.keys(payload).length === 0) {
        alert('No changes to save');
        return;
      }

      await updatePet.mutateAsync({ id: pet.id, data: payload });
      onSuccess?.();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update pet');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-muted rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`name-${pet.id}`}>Name</Label>
          <Input id={`name-${pet.id}`} {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`ownerName-${pet.id}`}>Owner Name</Label>
          <Input id={`ownerName-${pet.id}`} {...register('ownerName')} />
          {errors.ownerName && (
            <p className="text-sm text-destructive">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`birthDate-${pet.id}`}>Birth Date</Label>
          <Input id={`birthDate-${pet.id}`} type="date" {...register('birthDate')} />
          {errors.birthDate && (
            <p className="text-sm text-destructive">{errors.birthDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`imageUrl-${pet.id}`}>Image URL</Label>
          <Input id={`imageUrl-${pet.id}`} {...register('imageUrl')} />
          {errors.imageUrl && (
            <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`veterinarianId-${pet.id}`}>Veterinarian</Label>
          <Select
            value={veterinarianId}
            onValueChange={(value) => setValue('veterinarianId', value)}
          >
            <SelectTrigger id={`veterinarianId-${pet.id}`}>
              <SelectValue placeholder="Select a veterinarian" />
            </SelectTrigger>
            <SelectContent>
              {veterinariansLoading ? (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              ) : (
                veterinarians.map((vet) => (
                  <SelectItem key={vet.id} value={vet.id}>
                    {vet.firstName} {vet.lastName} - {vet.specialty}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {errors.veterinarianId && (
            <p className="text-sm text-destructive">{errors.veterinarianId.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`isVaccinated-${pet.id}`}
            checked={isVaccinated}
            onCheckedChange={(checked) => setValue('isVaccinated', checked === true)}
          />
          <Label htmlFor={`isVaccinated-${pet.id}`} className="cursor-pointer">
            Vaccinated
          </Label>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={updatePet.isPending} size="sm">
          {updatePet.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}

