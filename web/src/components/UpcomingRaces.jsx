import { useEffect, useState, useCallback } from "react";
import RaceCard from "./RaceCard";

const UpcomingRaces = ({ races = [] }) => {
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (races.length > 0) {
      // Get current date and time for comparison
      const currentDateTime = new Date();
      
      // Filter and sort upcoming races
      const filtered = races
        .filter((race) => {
          // Make sure we're using the correct date field
          if (!race.date) {
            return false;
          }
          
          // Parse the date string to a Date object
          const raceDateTime = new Date(race.date);
          
          // Compare full datetime
          return raceDateTime >= currentDateTime;
        })
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
      setUpcomingRaces(filtered);
    }
  }, [races]);

  const nextSlide = useCallback(() => {
    if (upcomingRaces.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === upcomingRaces.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [upcomingRaces.length]);

  const prevSlide = () => {
    if (upcomingRaces.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? upcomingRaces.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    let intervalId;
    if (!isPaused && upcomingRaces.length > 0) {
      intervalId = setInterval(nextSlide, 3000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, nextSlide, upcomingRaces.length]);

  const handleNavigation = (direction) => {
    setIsPaused(true);
    if (direction === "next") {
      nextSlide();
    } else {
      prevSlide();
    }
    // Resume auto-sliding after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section className="bg-slate-50/80 max-w-7xl mx-auto py-12 px-4 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          Próximas Carreras
        </h1>
        <div className="relative max-w-3xl mx-auto overflow-visible flex items-center">
          <button
            onClick={() => handleNavigation("prev")}
            className="absolute -left-16 top-1/2 -translate-y-1/2 bg-slate-800/80 text-white p-2 rounded-full hover:bg-slate-700 transition-colors cursor-pointer z-10"
            aria-label="Previous race"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="w-full overflow-hidden">
            {upcomingRaces.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-slate-600">
                  No hay carreras próximas disponibles
                </p>
                <p className="text-slate-500 mt-3">
                  Vuelve a consultar más tarde
                </p>
              </div>
            ) : (
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {upcomingRaces.map((race, index) => (
                    <div
                      key={race.id}
                      className="w-full flex-shrink-0"
                      style={{
                        opacity: index === currentIndex ? 1 : 0.5,
                        transition: "opacity 500ms ease-in-out",
                      }}
                    >
                      <RaceCard race={race} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => handleNavigation("next")}
            className="absolute -right-16 top-1/2 -translate-y-1/2 bg-slate-800/80 text-white p-2 rounded-full hover:bg-slate-700 transition-colors cursor-pointer z-10"
            aria-label="Next race"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingRaces;
