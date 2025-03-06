import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getTrailRunning } from "./../services/useServices";
import RaceCard from "./RaceCard";

const RaceList = () => {
  const {
    data: races,
    loading,
    error,
    setLoading,
  } = useFetch(getTrailRunning, []);
  const [visibleRaces, setVisibleRaces] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (races.length > 0) {
      setVisibleRaces(races.slice(0, visibleCount));
    }
  }, [races, visibleCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (!loading && visibleCount < races.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
            setLoading(false);
          }, 1000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, visibleCount, races.length, setLoading]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-slate-50/80 py-8 px-4 rounded-3xl">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          Lista de Carreras
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6 p-4">
          {visibleRaces.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
          {visibleCount >= races.length && !loading && races.length > 0 && (
            <div className="text-center text-gray-600 py-4">
              Ya no hay mas carreras.
            </div>
          )}
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <p>Error: {error}</p>
          </div>
        )}
        {races && races.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-xl text-slate-600">
              No hay carreras disponibles en este momento
            </p>
            <p className="text-slate-500 mt-2">Vuelve a consultar más tarde</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceList;
