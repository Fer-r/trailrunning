import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";

const RaceCard = ({ race }) => {
  return (
    <Link to={`/race/${race?.id}`} className="group">
      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden my-4 max-w-4xl mx-auto">
        <div className="flex flex-row h-36">
          <div className="w-1/4">
            <img
              src={race?.img}
              alt={race?.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="w-3/4 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-sky-900 group-hover:text-sky-700 transition-colors duration-300">
                {race?.name}
              </h3>
            </div>

            <div className="flex items-center justify-between gap-8">
              <span className="bg-sky-100 px-4 py-2 rounded-full text-sky-800 flex items-center gap-2 whitespace-nowrap">
                <FiCalendar className="text-lg" />
                {race?.release_date}
              </span>

              <span className="font-semibold text-sky-700 text-lg">
                {race?.distance_km} Km
              </span>

              <span className="text-gray-600 flex items-center gap-2">
                <FaLocationDot className="text-lg" />
                {race?.location}
              </span>

              <span className="text-sky-600 font-medium flex items-center gap-1 hover:text-sky-700 transition-colors duration-300">
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
