import { useState, useEffect } from "react";
import RaceCard from "./RaceCard";

const API_URL = import.meta.env.VITE_API_URL;

const RaceList = () => {
  const [allRaces, setAllRaces] = useState([]);
  const [visibleRaces, setVisibleRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await fetch(`${API_URL}/races`);
        if (!response.ok) throw new Error('Failed to fetch races');
        const data = await response.json();
        setAllRaces(data);
        setVisibleRaces(data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRaces();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        if (!loading && visibleCount < allRaces.length) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + 3);
            setVisibleRaces(allRaces.slice(0, visibleCount + 3));
            setLoading(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, visibleCount, allRaces]);

  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {visibleRaces.map((race) => (
        <RaceCard key={race.id} race={race} />
      ))}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {visibleCount >= allRaces.length && !loading && (
        <div className="text-center text-gray-600 py-4">
          Ya no hay mas carreras.
        </div>
      )}
    </div>
  );
};

export default RaceList;