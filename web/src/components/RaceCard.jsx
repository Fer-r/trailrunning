import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";

const RaceCard = ({race}) => {
  // const getStatusImage = (status) => {
  //   switch (status?.toLowerCase()) {
  //     case "open":
  //       return "../images/open.png";
  //     case "closed":
  //       return "../images/closed.png";
  //     case "completed":
  //       return "../images/complete.png";
  //     default:
  //       return race?.img || "/images/default-race.jpg";
  //   }
  // };

  return (
    <Link to={`/trailrunning/${race?.id}`} className="group block touch-manipulation">
      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-shadow duration-300 overflow-hidden my-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row h-auto sm:h-36">
          <div className="w-full sm:w-1/4 h-48 sm:h-full relative">
            <img
              src={race?.img}
              alt={race?.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* <img
              src={getStatusImage(race?.status)}
              alt={`Estado: ${race?.status}`}
              className="absolute top-2 right-2 w-12 h-12"
              loading="lazy"
            /> */}
          </div>

          <div className="w-full sm:w-3/4 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-sky-900 group-hover:text-sky-700 transition-colors duration-300">
                {race?.name}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-8 mt-3 sm:mt-0">
              <span className="bg-sky-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sky-800 flex items-center gap-2 whitespace-nowrap text-sm sm:text-base">
                <FiCalendar className="text-lg" />
                {race?.release_date}
              </span>

              <span className="font-semibold text-sky-700 text-base sm:text-lg">
                {race?.distance_km} Km
              </span>

              <span className="text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                <FaLocationDot className="text-lg" />
                {race?.location}
              </span>
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
