// Imports
// ========================================================
import React, { createContext, useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import FullLoader from '../../components/FullLoader';
import { useMutation, useQuery } from 'react-query';

// Config
// ========================================================
/**
 * 
 */
const AuthLoaderContext = createContext<{
  token?: string;
  isAppLoaded: boolean,
  user: {
    id: string;
    name: string;
    display?: string;
    providerId: string;
    createdAt: string;
    updatedAt: string;
  } | undefined | null,
  userIsLoading: boolean;
  getUser: () => void,
}>({ token: undefined, isAppLoaded: true, user: undefined, userIsLoading: false, getUser: () => { } });

/**
 * 
 */
const PRIVATE_DIRECTORY = '/account';

// Main Provider
// ========================================================
const AuthLoaderProvider: React.FC = ({ children }) => {
  // State / Props
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Requests
  /**
   * 
   */
  const { data: token } = useQuery(['getToken'], async () => {
    try {
      return await getAccessTokenSilently();
    } catch (err: any) {
      throw Error(err?.message || err || 'Unknown error.');
    }
  });

  /**
   * 
   */
  const { data: user, isLoading: userIsLoading, mutate } = useMutation(async ({ token }: { token?: string }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      if (response.ok) {
        const json = await response.json();
        setIsAppLoaded(true);
        return json?.data ?? json;
      }
      throw new Error(await response.json());
    } catch (error: any) {
      throw new Error(error);
    }
  });

  // Functions
  /**
   * 
   */
  const getUser = async () => {
    if (token) {
      mutate({ token });
    }
  };

  // Hooks
  /**
   * If user is not authenticated, redirect them
   */
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated && pathname.startsWith(PRIVATE_DIRECTORY)) {
      loginWithRedirect({
        redirectUri: `${window.location.origin}/account`
      });
      return;
    } else if (isAuthenticated) {
      return;
    }
    setIsAppLoaded(true);
  }, [isLoading, isAuthenticated]);

  /**
   * If token set retrieve user data
   */
  useEffect(() => {
    if (!token) return;
    mutate({ token });
  }, [token])

  // Render
  /**
   * Loading
   */
  if (pathname.startsWith(PRIVATE_DIRECTORY) && (isLoading || (!isAppLoaded && !isAuthenticated))) return <FullLoader darkMode />;

  /**
   * App
   */
  return <div>
    <AuthLoaderContext.Provider value={{ token, isAppLoaded, user, userIsLoading, getUser }}>
      {children}
    </AuthLoaderContext.Provider>
  </div>
}

// Hooks
// ========================================================
/**
 * 
 * @returns 
 */
const useAuthLoader = () => useContext(AuthLoaderContext);

// Exports
// ========================================================
export default AuthLoaderProvider;
export {
  useAuthLoader
}