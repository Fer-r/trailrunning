import { useFetch } from "../hooks/useFetch";
import RaceCard from "./RaceCard";
import raceData from "../example.json";

const API_URL = import.meta.env.VITE_URL_API;

const RaceList = () => {
  // Keep useFetch commented for future use
  // const { data, error, loading } = useFetch(`${API_URL}/api/trailrunning`);
  const races = raceData.races;

  return (
    <div className="min-h-screen w-11/12 mx-auto bg-slate-50/80 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          Lista de Carreras
        </h1>

        {races.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-slate-600">
              No hay carreras disponibles en este momento
            </p>
            <p className="text-slate-500 mt-2">Vuelve a consultar más tarde</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {races.map((race) => (
              <RaceCard key={race.id} race={race} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceList;
