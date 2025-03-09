import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RaceList from "../components/RaceList";
import UpcomingRaces from "../components/UpcomingRaces";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getTrailRunning } from "../services/useServices";
import LoadingSpinner from "../components/LoadingSpinner";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data: races, loading, error } = useFetch(getTrailRunning, []);
  
  const backgroundImages = [
    "/fondo1.png",
    "/fondo2.png",
    "/fondo3.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {backgroundImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Trail running background ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-100"
              } ${isTransitioning ? "blur-sm" : ""}`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold p-2 sm:p-4">Trail Running Hlanz</h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Descubre las mejores rutas de trail running y únete a una comunidad
            apasionada por la naturaleza y el deporte.
          </p>
        </div>
      </section>

      {/* Upcoming Races Section */}
      <section className="bg-[#F8E4BE] py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p>Error: {error}</p>
            </div>
          ) : (
            <UpcomingRaces races={races} />
          )}
        </div>
      </section>

      {/* All Races Section */}
      <section className="bg-[#F8E4BE] py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p>Error: {error}</p>
            </div>
          ) : (
            <RaceList races={races} />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
