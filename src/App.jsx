import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import { setCredentials } from './redux/auth/authSlice';
import { selectIsRefreshing } from './redux/auth/selectors';

import PrivateRoute from './routes/PrivateRoute';
// PublicRoute'u sadece Login/Register sayfaları oluşturursan orada kullanacağız

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
          email: user.email,
          uid: user.uid
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Yükleniyor...</div>; 
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Ana sayfa artık herkese açık! */}
        <Route index element={<HomePage />} />
        
        <Route path="psychologists" element={<PsychologistsPage />} />
        
        {/* Sadece favoriler özel (Private) kalmaya devam ediyor */}
      <Route 
  path="favorites" 
  element={
    <PrivateRoute 
      redirectTo="/" 
      component={<FavoritesPage />} // component olarak gönderiyoruz
    />
  } 
/>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;