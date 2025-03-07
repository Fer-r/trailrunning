import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useFilter } from "../hooks/useFilter";
import { getTrailRunning } from "./../services/useServices";
import RaceCard from "./RaceCard";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Select from "react-select";

const RaceList = () => {
  const {
    data: races,
    loading,
    error,
    setLoading,
  } = useFetch(getTrailRunning, []);
  const [visibleRaces, setVisibleRaces] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const {
    sortRacesByDistance,
    sortedByLocation,
    setSortedByLocation,
    setDateRange,
    dateRange,
    selectedCategories,
    setSelectedCategories,
    applyFilters,
  } = useFilter(races);
  const categoryOptions = [
    { value: "Trail Medio", label: "Trail Medio" },
    { value: "Ultra Trail", label: "Ultra Trail" },
    { value: "Maratón de Montaña", label: "Maratón de Montaña" },
    { value: "Trail Costero", label: "Trail Costero" },
    { value: "Trail Corto", label: "Trail Corto" },
    { value: "Trail Técnico", label: "Trail Técnico" },
  ];
  // Actualiza las carreras visibles basado en filtros y ubicación
  useEffect(() => {
    if (races && races.length > 0) {
      const updateRaces = async () => {
        let filteredRaces;
        
        if (sortedByLocation) {
          filteredRaces = await sortRacesByDistance();
        } else {
          filteredRaces = applyFilters(races);
        }
  
        setVisibleRaces(filteredRaces.slice(0, visibleCount));
      };
  
      updateRaces();
    }
  }, [races, visibleCount, sortedByLocation, dateRange, selectedCategories]);
  // Maneja el scroll infinito para cargar más carreras
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
          }, 500);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, visibleCount, races.length, setLoading]);
  // Alterna entre mostrar carreras por ubicación o todas las carreras
  const handleLocationSort = async () => {
    if (sortedByLocation) {
      const filteredRaces = applyFilters(races);
      setVisibleRaces(filteredRaces.slice(0, visibleCount));
      setSortedByLocation(false);
    } else {
      const sortedRaces = await sortRacesByDistance();
      setVisibleRaces(sortedRaces.slice(0, visibleCount));
    }
  };
  // Actualiza las categorías seleccionadas en el filtro
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  // Limpia todos los filtros aplicados
  const handleClearFilters = () => {
    setDateRange({ start: null, end: null });
    setSelectedCategories([]);
    document.getElementById("start").value = "";
    document.getElementById("end").value = "";
  };
  // Maneja los cambios en el filtro de fechas
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value ? new Date(value) : null,
    }));
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-slate-50/80 py-8 px-4 rounded-3xl">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">
          Lista de Carreras
        </h1>
        <div className="flex items-center flex-wrap gap-3 mb-4 justify-center">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="flex cursor-pointer items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {showDateFilter ? (
              <>
                <span className="text-lg">×</span>
                Ocultar filtros
              </>
            ) : (
              <>
                <span className="text-lg">+</span>
                Filtros
              </>
            )}
          </button>
          <button
            onClick={handleLocationSort}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaLocationCrosshairs className="text-lg" />
            {sortedByLocation ? "Ver todas" : "Más relevantes"}
          </button>
        </div>
        <div>
          {showDateFilter && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <div className="flex flex-col gap-3 relative group cursor-pointer">
                  <label
                    htmlFor="start"
                    className="text-gray-700 font-medium flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      document.getElementById("start").showPicker()
                    }
                  >
                    <span className="text-green-600">●</span>
                    Fecha inicial
                  </label>
                  <div
                    className="relative"
                    onClick={() =>
                      document.getElementById("start").showPicker()
                    }
                  >
                    <input
                      type="date"
                      id="start"
                      name="start"
                      className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md w-full cursor-pointer"
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block" />
                <div className="flex flex-col gap-3 relative group cursor-pointer">
                  <label
                    htmlFor="end"
                    className="text-gray-700 font-medium flex items-center gap-2 cursor-pointer"
                    onClick={() => document.getElementById("end").showPicker()}
                  >
                    <span className="text-blue-600">●</span>
                    Fecha final
                  </label>
                  <div
                    className="relative"
                    onClick={() => document.getElementById("end").showPicker()}
                  >
                    <input
                      type="date"
                      id="end"
                      name="end"
                      className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md w-full cursor-pointer"
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block" />

                <div className="flex flex-col gap-3 w-full md:w-64">
                  <label className="text-gray-700 font-medium">
                    Categorías
                  </label>
                  <Select
                    isMulti
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Seleccionar categorías..."
                    value={categoryOptions.filter((option) =>
                      selectedCategories.includes(option.value)
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-gray-700 font-medium opacity-0">
                    Acción
                  </label>
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 cursor-pointer bg-gray-600 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span className="text-lg">×</span>
                    Limpiar filtros
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6 p-4">
          {visibleRaces.map((race) => (
            <RaceCard
              key={race.id}
              race={race}
              distance={
                sortedByLocation && race.distance
                  ? `a ${race.distance.toFixed(1)} km de ti`
                  : null
              }
            />
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
