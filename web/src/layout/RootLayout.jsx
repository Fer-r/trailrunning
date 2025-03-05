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
    <div className="min-h-screen flex flex-col bg-[#F8E4BE]">
      <nav className="bg-[#8EB486] shadow-lg">
        <div className="max-w-7xl mx-auto px-1">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center ">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Trail Running Logo" className="h-20 w-auto" />
                <span className="text-xl font-bold italic font-serif">Trail Running</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              {isAuth && (
                <Link to="/profile" className="text-white font-bold text-lg hover:scale-110 px-3 py-2 transition-all duration-300 transform inline-block">
                  Profile
                </Link>
              )}
            </div>
            
            <div className="hidden md:block">
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#8EB486] text-white px-6 py-2 rounded-full border-2 border-red-500 hover:bg-[#7a9c72] transition-all duration-300 font-medium cursor-pointer select-none"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-[#8EB486] text-white px-6 py-2 rounded-full border-2 border-white hover:bg-[#7a9c72] transition-all duration-300 font-medium cursor-pointer select-none"
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
            {/* Update mobile menu as well */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {isAuth && (
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-gray-800 hover:text-sky-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
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
      <main className={isHomePage ? "" : "mx-auto mt-8 px-4 py-8 bg-[#F8E4BE]"}>
        <Outlet />
      </main>
      <footer className="bg-[#8EB486] text-[#FDF7F4] mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Trail Running Hlanz</h3>
              <p className="text-sm">
                Descubre las mejores rutas de trail running y únete a nuestra
                comunidad.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/races"
                    className="hover:text-white transition-colors"
                  >
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-white transition-colors"
                  >
                    Perfil
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <p className="text-sm">Email: info@trailrunning.com</p>
              <p className="text-sm">Tel: +34 123 456 789</p>
            </div>
          </div>
          <div className="border-t border-[#FDF7F4]/20 mt-8 pt-4 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Trail Running Hlanz. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
