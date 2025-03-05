import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RaceList from "../components/RaceList";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <img
        src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop"
        alt="Trail running background"
        className="absolute inset-0 z-0 w-full h-full object-cover brightness-50"
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold p-2 sm:p-4">Trail Running Hlanz</h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
          Descubre las mejores rutas de trail running y únete a una comunidad
          apasionada por la naturaleza y el deporte.
        </p>
        <RaceList />
      </div>
    </div>
  );
};

export default Home;
