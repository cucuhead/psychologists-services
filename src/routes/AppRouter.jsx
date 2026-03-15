import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// Private ve Public route bileşenlerini import et

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const PsychologistsPage = lazy(() => import('../pages/PsychologistsPage/PsychologistsPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        
        {/* Sadece giriş yapmış kullanıcılar görebilir */}
        <Route path="/favorites" element={<FavoritesPage />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;