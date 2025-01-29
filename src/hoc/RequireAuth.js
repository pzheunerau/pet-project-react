import { useLocation, Navigate } from 'react-router-dom'; 
// import { useAuth } from '../hooks/useAuth';

const RequireAuth = ({children}) => {
  const location = useLocation();
  // const {user} = useAuth();

  const isLogined = localStorage.getItem('isLogined');

  // if (!user) {
  if (!isLogined) {
    return <Navigate to='/login' state={{from: location}} />
  }

  return children;
}

export {RequireAuth};