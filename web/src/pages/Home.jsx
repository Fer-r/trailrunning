import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token") !== null;

  const handleLogin = () => {
    localStorage.setItem("token", JSON.stringify("hola mundo"));
    navigate("/dashboard");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold  mb-8">
        Bienvenido a la página de inicio.
      </h1>
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
  );
};

export default Home;
