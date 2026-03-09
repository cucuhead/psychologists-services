import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  // Giriş yapılmışsa bileşeni göster, yapılmamışsa yönlendir
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;