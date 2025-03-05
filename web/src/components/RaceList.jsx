import RaceCard from "./RaceCard";
import raceData from "../example.json";

const RaceList = () => {
  const races = raceData.races;

  return (
    <div className="min-h-screen w-11/12 mx-auto bg-slate-50/80 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          Lista de Carreras
        </h1>
        <div className="grid grid-cols-1 gap-4 p-4">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaceList;
