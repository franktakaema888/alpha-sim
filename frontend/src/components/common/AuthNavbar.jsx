import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const AuthNavbar = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left section with Logo and navigation links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/home" className="text-2xl font-bold text-white">αSim</Link>
          
          {/* Primary Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/home" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/trade" className="text-gray-300 hover:text-white">Trade</Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-white">Portfolio</Link>
            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          </div>
        </div>

        {/* Right section with User Profile and Logout */}
        <div className="flex items-center space-x-4">
          <span className="text-white">Welcome, {username}!</span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-white hover:bg-secondary rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;