import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <main className={styles.mainContent}>
        {/* Sayfa geçişlerinde beyaz ekran olmasın diye Suspense ekledik */}
        <Suspense fallback={null}>
          <Outlet /> 
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;