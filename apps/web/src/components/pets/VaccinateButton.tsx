import { Syringe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pet } from '@/features/pets/types';

interface VaccinateButtonProps {
  pet: Pet;
  onVaccinate: () => void;
}

export function VaccinateButton({ pet, onVaccinate }: VaccinateButtonProps) {
  if (pet.isVaccinated) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        title="Pet is already vaccinated."
      >
        <Syringe className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onVaccinate}
      title="Vaccinate pet"
    >
      <Syringe className="h-4 w-4" />
    </Button>
  );
}

