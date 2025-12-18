import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { PetsListPage } from './pages/PetsListPage';
import { AddPetPage } from './pages/AddPetPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<PetsListPage />} />
        <Route path="/pets/new" element={<AddPetPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

