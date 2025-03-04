import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF7F4]">
      <nav className="bg-[#8EB486] shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-[#FDF7F4] hover:text-white text-xl font-bold transition-colors"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="text-[#FDF7F4] hover:text-white text-xl font-bold transition-colors"
              >
                Profile
              </Link>
            </div>
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="bg-[#685752] text-[#FDF7F4] px-6 py-2 rounded-lg hover:bg-[#997C70] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-[#997C70] text-[#FDF7F4] px-6 py-2 rounded-lg hover:bg-[#685752] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
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
