import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth"; // Eklendi
import { auth } from './firebase/config'; // Eklendi
import { setCredentials } from './redux/auth/authSlice'; // Eklendi
import Header from './components/Header/Header';
import { selectIsRefreshing } from './redux/auth/selectors';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    // Firebase auth durumunu dinle (Sayfa yenilenince Redux'ı doldurur)
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
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/psychologists" element={<div>Psychologists Page</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;