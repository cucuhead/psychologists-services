import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/selectors';

/**
 * PublicRoute: Giriş yapmış kullanıcıların (isLoggedIn: true) 
 * kısıtlı sayfalara (Login/Register) erişmesini engeller ve yönlendirir.
 */
const PublicRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default PublicRoute;