import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RaceList from "../components/RaceList";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        document.documentElement.style.setProperty(
          "--scroll-offset",
          `${scrolled * 0.15}px`
        );
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg')] bg-cover bg-center bg-no-repeat blur-[1px] scale-110"
          style={{
            transform: "translate3d(0, var(--scroll-offset, 0), 0)",
            willChange: "transform",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Trail Running Hlanz
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Descubre las mejores rutas de trail running y únete a una comunidad
            apasionada por la naturaleza y el deporte.
          </p>
          <button
            onClick={() => navigate("/races")}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Explorar Carreras
          </button>
        </div>
      </div>

      {/* Race List Section */}
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Próximas Carreras
          </h2>
          <RaceList />
        </div>
      </div>
    </div>
  );
};

export default Home;
