import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import { setCredentials } from './redux/auth/authSlice';
import { selectIsRefreshing } from './redux/auth/selectors';

// Sayfa ve Layout Bileşenleri
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import PsychologistsPage from './pages/PsychologistsPage/PsychologistsPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCredentials({
          name: user.displayName,
          email: user.email
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Yükleniyor...</div>; // Buraya daha sonra bir Spinner ekleyebiliriz
  }

  return (
    <Routes>
      {/* Layout, Header'ı içinde barındırır ve tüm sayfalara ortak çerçeve sağlar */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="psychologists" element={<PsychologistsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        {/* Tanımlı olmayan bir yere gidilirse ana sayfaya atar */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;