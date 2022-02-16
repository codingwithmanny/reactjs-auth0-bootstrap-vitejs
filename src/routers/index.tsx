// Imports
// ========================================================
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import AccountPage from '../pages/Account';
import UserPage from '../pages/User';

// Pages

// Main Router
// ========================================================
const RootRouter = () => {
  return <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  </div>
};

// Exports
// ========================================================
export default RootRouter;
