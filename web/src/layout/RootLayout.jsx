import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const { isAuthenticated, login, logOut } = useAuth();
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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-4">
              <Link to="/" className="text-xl font-bold">
                Home
              </Link>
              <Link to="/profile" className="text-xl font-bold">
                Profile
              </Link>
              <Link to="/dashboard" className="text-xl font-bold">
                Dashboard
              </Link>
            </div>
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 hover:shadow-2xl"
              >
                Cerrar Sesión
              </button>
            ) : (<button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 hover:shadow-2xl"
          >
            Iniciar Sesión
          </button>
        )}
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto mt-8 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
