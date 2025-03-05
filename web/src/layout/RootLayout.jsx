import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const RootLayout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = localStorage.getItem("token") !== null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if current path is home page
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                Trail Running
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-800 hover:text-sky-600 px-3 py-2">
                Home
              </Link>
              <Link to="/profile" className="text-gray-800 hover:text-sky-600 px-3 py-2">
                Profile
              </Link>
            </div>
            
            <div className="hidden md:block">
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 hover:shadow-2xl"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 hover:shadow-2xl"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                className="text-gray-800 hover:text-sky-600 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-800 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/profile" 
                className="block px-3 py-2 text-gray-800 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 text-gray-800 hover:text-sky-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-2">
                {isAuth ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <main className={isHomePage ? "" : "mx-auto mt-8 px-4 py-8"}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
