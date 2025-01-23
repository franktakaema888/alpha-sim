import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/useAuth';
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;