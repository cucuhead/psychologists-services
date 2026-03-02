import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { selectIsRefreshing } from './redux/auth/selectors';
// refreshUser operasyonunu birazdan yazacağız, şimdilik böyle kalsın
// import { refreshUser } from './redux/auth/operations'; 

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcıyı kontrol etme tetiklenecek
    // dispatch(refreshUser()); 
    console.log("App yüklendi, kullanıcı kontrolü yapılacak.");
  }, [dispatch]);

  // Eğer sayfa yenileniyorsa (kullanıcı bekleniyorsa) bir loading gösterilebilir
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
          {/* Diğer rotalar buraya gelecek */}
        </Routes>
      </main>
    </>
  );
}

export default App;