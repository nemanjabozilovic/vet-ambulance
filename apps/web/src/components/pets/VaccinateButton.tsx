import { useState } from 'react';
import { Syringe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pet } from '@/features/pets/types';

interface VaccinateButtonProps {
  pet: Pet;
  onVaccinate: () => void;
}

export function VaccinateButton({ pet, onVaccinate }: VaccinateButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  if (pet.isVaccinated) {
    return (
      <>
        <Button
          variant="outline"
          size="icon"
          className="cursor-not-allowed opacity-50"
          onClick={() => setShowDialog(true)}
          title="Pet is already vaccinated"
        >
          <Syringe className="h-4 w-4" />
        </Button>
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Pet is already vaccinated</AlertDialogTitle>
              <AlertDialogDescription>
                {pet.name} is already vaccinated and cannot be vaccinated again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowDialog(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
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

