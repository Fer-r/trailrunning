import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import defaultTrailImage from "../assets/default-trail.jpg";

const RaceCard = ({ race, distance }) => {
  const handleImageError = (e) => {
    e.target.src = defaultTrailImage;
  };

  return (
    <Link
      to={`/trailrunning/${race?.id}`}
      className="group block touch-manipulation"
    >
      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-shadow duration-300 overflow-hidden my-2 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row h-auto sm:h-36">
          <div className="w-full sm:w-1/4 h-48 sm:h-full relative">
            <img
              src={race?.img || defaultTrailImage}
              alt={race?.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={handleImageError}
            />
            <div
              className={`absolute bottom-2 right-2 px-3 py-1 rounded-lg text-white text-sm font-medium ${
                race?.status === "open"
                  ? "bg-green-500"
                  : race?.status === "closed"
                  ? "bg-red-500"
                  : race?.status === "completed"
                  ? "bg-orange-500"
                  : "bg-gray-500"
              }`}
            >
              {race?.status}
            </div>
          </div>

          <div className="w-full sm:w-3/4 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-sky-900 group-hover:text-sky-700 transition-colors duration-300">
                {race?.name}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-8 mt-3 sm:mt-0">
              <span className="bg-[#8B4513] px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[#F8E4BE] flex items-center gap-2 whitespace-nowrap text-sm sm:text-base">
                <FiCalendar className="text-lg" />
                {
                  new Date(race?.date)
                    .toLocaleString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .split(",")[0]
                }
              </span>

              <span className="font-semibold text-base sm:text-lg">
                <span className="text-black">{race?.distance_km}</span>{" "}
                <span className="text-sky-700">Km</span>
              </span>

              <span className="text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                <FaLocationDot className="text-lg" />
                {race?.location}
              </span>
              {distance && (
                <span className="text-green-600 font-medium">
                  A {distance} de ti
                </span>
              )}
              <span className="text-sky-600 font-medium flex items-center gap-1 hover:text-sky-700 transition-colors duration-300 text-sm sm:text-base">
                Ver detalles
                <span className="text-lg">→</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RaceCard;
