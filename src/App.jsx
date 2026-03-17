import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import { setCredentials } from './redux/auth/authSlice';
import { selectIsRefreshing } from './redux/auth/selectors';

import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import PsychologistsPage from './pages/PsychologistsPage/PsychologistsPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

import { Toaster } from 'react-hot-toast'; 

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
    <>
      {/* 1. ÖNEMLİ: Toaster mutlaka burada, Routes'un hemen üstünde olmalı */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        containerStyle={{
          zIndex: 999999, // Modal'ın (image_6c7c6c.jpg) bile üstünde görünmesi için çok yüksek değer
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="psychologists" element={<PsychologistsPage />} />
          <Route 
            path="favorites" 
            element={
              <PrivateRoute 
                redirectTo="/" 
                component={<FavoritesPage />} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;