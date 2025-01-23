import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/useAuth';
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton';


const Navbar = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left section with Logo and navigation links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">αSim</Link>
          
          {/* Primary Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          </div>
        </div>

        {/* Right section with Sign In and Register */}
        {!isAuthenticated && !isLoginPage && (
          <div className="flex items-center space-x-4">
            <LoginButton />
          </div>
        )}
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;