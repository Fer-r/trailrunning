import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RaceList from "../components/RaceList";
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-6">
          Trail Running Hlanz
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Descubre las mejores rutas de trail running y únete a una comunidad apasionada por la naturaleza y el deporte.
        </p>
        <RaceList />
      </div>
    </div>
  );
};

export default Home;
