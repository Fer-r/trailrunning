import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token") !== null;


  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold  mb-8">
        Bienvenido a la página de inicio.
      </h1>
    </div>
  );
};

export default Home;
