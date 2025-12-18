import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PetsTable } from '@/components/pets/PetsTable';
import { usePets, useDeactivatePet, useVaccinatePet } from '@/features/pets/hooks';

export function PetsListPage() {
  const navigate = useNavigate();
  const { data: pets = [], isLoading, error } = usePets();
  const deactivatePet = useDeactivatePet();
  const vaccinatePet = useVaccinatePet();

  const handleDeactivate = async (id: string) => {
    try {
      await deactivatePet.mutateAsync(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to deactivate pet');
    }
  };

  const handleVaccinate = async (id: string) => {
    try {
      await vaccinatePet.mutateAsync(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to vaccinate pet';
      alert(message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading pets...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Error loading pets: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Pets</h2>
        <Button onClick={() => navigate('/pets/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add new pet
        </Button>
      </div>
      <PetsTable pets={pets} onDeactivate={handleDeactivate} onVaccinate={handleVaccinate} />
    </div>
  );
}

