import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { useCreatePet } from '@/features/pets/hooks';
import { useVeterinarians } from '@/features/veterinarians/hooks';

const createPetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  birthDate: z.string().min(1, 'Birth date is required').refine(
    (date) => {
      const dateObj = new Date(date);
      return dateObj <= new Date();
    },
    'Birth date cannot be in the future'
  ),
  isVaccinated: z.boolean().default(false),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  veterinarianId: z.string().min(1, 'Veterinarian is required'),
});

type CreatePetFormData = z.infer<typeof createPetSchema>;

export function AddPetPage() {
  const navigate = useNavigate();
  const { data: veterinarians = [], isLoading: veterinariansLoading } = useVeterinarians();
  const createPet = useCreatePet();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePetFormData>({
    resolver: zodResolver(createPetSchema),
    defaultValues: {
      isVaccinated: false,
    },
  });

  const veterinarianId = watch('veterinarianId');
  const isVaccinated = watch('isVaccinated');

  const onSubmit = async (data: CreatePetFormData) => {
    try {
      const payload = {
        ...data,
        birthDate: new Date(data.birthDate).toISOString(),
      };
      await createPet.mutateAsync(payload);
      navigate('/');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create pet');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          ← Back to Pets
        </Button>
      </div>
      <h2 className="text-3xl font-bold mb-6">Add New Pet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register('ownerName')} />
          {errors.ownerName && (
            <p className="text-sm text-destructive">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input id="birthDate" type="date" {...register('birthDate')} />
          {errors.birthDate && (
            <p className="text-sm text-destructive">{errors.birthDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" {...register('imageUrl')} />
          {errors.imageUrl && (
            <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isVaccinated"
            checked={isVaccinated}
            onCheckedChange={(checked) => setValue('isVaccinated', checked === true)}
          />
          <Label htmlFor="isVaccinated" className="cursor-pointer">
            Vaccinated
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="veterinarianId">Veterinarian</Label>
          <Select
            value={veterinarianId}
            onValueChange={(value) => setValue('veterinarianId', value)}
          >
            <SelectTrigger id="veterinarianId">
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

        <div className="flex gap-4">
          <Button type="submit" disabled={createPet.isPending}>
            {createPet.isPending ? 'Creating...' : 'Create Pet'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

