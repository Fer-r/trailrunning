import { useState, useEffect } from 'react';
import RaceCard from './RaceCard';
import raceData from '../example.json';

const RaceList = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const loadMoreRaces = () => {
    setLoading(true);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newRaces = raceData.races.slice(startIndex, endIndex);
    setTimeout(() => {
      if (page === 1) {
        setRaces(newRaces);
      } else {
        setRaces(prevRaces => [...prevRaces, ...newRaces]);
      }
      setLoading(false);
    }, 500); // Small delay for smooth transition
  };

  useEffect(() => {
    loadMoreRaces();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      // Load next page when user is 300px from bottom
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300 &&
        !loading &&
        races.length < raceData.races.length
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, races.length]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="space-y-4">
        {races.map((race, index) => (
          <div
            key={race.id}
            className="animate-fadeIn"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <RaceCard race={race} />
          </div>
        ))}
      </div>
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sky-600 border-r-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default RaceList;