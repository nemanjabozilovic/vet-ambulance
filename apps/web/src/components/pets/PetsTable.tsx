import { format } from 'date-fns';
import { X, Syringe } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { VaccinateButton } from './VaccinateButton';
import { Pet } from '@/features/pets/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PetsTableProps {
  pets: Pet[];
  onDeactivate: (id: string) => void;
  onVaccinate: (id: string) => void;
}

export function PetsTable({ pets, onDeactivate, onVaccinate }: PetsTableProps) {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No pets found.</p>
        <p className="text-sm mt-2">Add a new pet to get started.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Birth Date</TableHead>
          <TableHead>Veterinarian</TableHead>
          <TableHead>Vaccinated</TableHead>
          <TableHead>Image</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pets.map((pet) => (
          <TableRow key={pet.id}>
            <TableCell className="font-medium">{pet.name}</TableCell>
            <TableCell>{pet.ownerName}</TableCell>
            <TableCell>{format(new Date(pet.birthDate), 'MMM dd, yyyy')}</TableCell>
            <TableCell>
              {pet.veterinarian.firstName} {pet.veterinarian.lastName}
            </TableCell>
            <TableCell>
              {pet.isVaccinated ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-red-600 font-medium">No</span>
              )}
            </TableCell>
            <TableCell>
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                }}
              />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <VaccinateButton
                  pet={pet}
                  onVaccinate={() => onVaccinate(pet.id)}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deactivate Pet</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to deactivate {pet.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeactivate(pet.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Deactivate
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

