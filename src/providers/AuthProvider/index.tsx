// Imports
// ========================================================
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

// Main Provider
// ========================================================
const AuthProvider: React.FC = ({ children }) => {
  // Render
  return (
    <Auth0Provider
      domain={(import.meta.env?.VITE_AUTH0_DOMAIN ?? '') as string}
      clientId={(import.meta.env?.VITE_AUTH0_CLIENT_ID ?? '') as string}
      redirectUri={`${window.location.origin}/account`}
      audience={(import.meta.env?.VITE_AUTH0_AUDIENCE ?? '') as string}
      scope="user_metadata app_metadata"
    >
      {children}
    </Auth0Provider>
  );
};

// Exports
// ========================================================
export default AuthProvider;