// Imports
// ========================================================
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import AuthLoaderProvider from './AuthLoaderProvider';
import QueryProvider from './QueryProvider';

// RootProvider
// ========================================================
const RootProvider: React.FC = ({ children }) => {
  return <div>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <AuthLoaderProvider>
            {children}
          </AuthLoaderProvider>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </div>
};

// Exports
// ========================================================
export default RootProvider;