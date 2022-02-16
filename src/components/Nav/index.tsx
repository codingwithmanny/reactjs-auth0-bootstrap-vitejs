// Imports
// ========================================================
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Components
import Loader from "../../components/Loader";
import { useAuthLoader } from "../../providers/AuthLoaderProvider";
import React from "react";

// Component
// ========================================================
const Nav = () => {
  // Props
  const { isLoading, logout, loginWithRedirect } = useAuth0();
  const { user, userIsLoading } = useAuthLoader();
  const navigate = useNavigate();

  // Functions
  /**
 * 
 * @param event 
 */
  const onClickSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logout();
  };

  /**
   * 
   */
  const onClickAccount = () => {
    navigate('/account')
  }

  /**
   * 
   */
  const onClickSignIn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    loginWithRedirect({
      redirectUri: `${window.location.origin}/account`
    });
  }

  // Render
  return <nav className="p-4 bg-gray-800 flex justify-between">
    <Link to="/">
      <h1 className="text-xl text-white font-semibold">App</h1>
    </Link>
    {isLoading || userIsLoading ? <div className="text-sm relative w-12 font-semibold text-gray-400 h-8 bg-gray-700 hover:bg-gray-900 hover:text-white rounded block px-4 leading-8 transition-colors ease-in-out duration-200">
      <Loader className="w-4 absolute inset-0 m-auto" />
    </div> : user
      ? <div className="flex">
        <div onClick={onClickAccount} className="h-8 cursor-pointer leading-8 text-gray-400 flex pl-8 relative hover:text-gray-200 transition-colors ease-in-out duration-200">
          <span className="rounded-full h-6 w-6 bg-gray-600 block absolute left-0 top-0 bottom-0 my-auto"></span>
          {user?.name}
        </div>
        <Link to="#" className="text-sm ml-4 font-semibold text-gray-400 h-8 bg-gray-700 hover:bg-gray-900 hover:text-white rounded block px-4 leading-8 transition-colors ease-in-out duration-200" onClick={onClickSignOut}>Sign Out</Link>
      </div>
      : <Link className="text-sm font-semibold text-gray-400 h-8 bg-gray-700 hover:bg-gray-900 hover:text-white rounded block px-4 leading-8 transition-colors ease-in-out duration-200" to="#login" onClick={onClickSignIn}>Sign Up/In</Link>}
  </nav>
};

// Exports
// ========================================================
export default Nav;