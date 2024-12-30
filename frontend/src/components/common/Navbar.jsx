import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

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
            <Link 
              to="/login"
              className="px-6 py-2 text-white hover:bg-secondary rounded-lg transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;