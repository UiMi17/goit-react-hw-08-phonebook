import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsOnline } from 'redux/Auth/authSelectors';

export const PrivateRoute = ({ children }) => {
  const isOnline = useSelector(selectIsOnline);

  if (!isOnline) {
    return <Navigate to="/login" />;
  }

  return children;
};
