import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import { setAuthToken } from '../../services/api.service';

const AuthWrapper = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  return children;
};

export default AuthWrapper;
