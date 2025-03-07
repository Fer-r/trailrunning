import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useFilter = (races) => {
  const [sortedByLocation, setSortedByLocation] = useState(false); // Changed to false by default
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user } = useAuth();

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalizacion no reconocida"));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  const filterRacesByDate = (races, startDate, endDate) => {
    if (!startDate || !endDate) return races;

    return races.filter((race) => {
      const raceDate = new Date(race.release_date);
      return raceDate >= startDate && raceDate <= endDate;
    });
  };

  const filterRacesByCategories = (races, categories) => {
    if (!categories || categories.length === 0) return races;

    return races.filter((race) => categories.includes(race.category));
  };
  const applyFilters = (racesToFilter) => {
    let filteredRaces = [...racesToFilter];

    if (dateRange.start && dateRange.end) {
      filteredRaces = filterRacesByDate(
        filteredRaces,
        dateRange.start,
        dateRange.end
      );
    }
    if (selectedCategories.length > 0) {
      filteredRaces = filterRacesByCategories(
        filteredRaces,
        selectedCategories
      );
    }
    return filteredRaces;
  };
  const sortRacesByDistance = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      let filteredRaces = applyFilters(races);
      const racesWithDistance = filteredRaces.map((race) => {
        const [raceLat, raceLng] = race.coordinates
          .split(",")
          .map((coord) => parseFloat(coord));
        const distance = calculateDistance(
          latitude,
          longitude,
          raceLat,
          raceLng
        );

        const isUserRegistered = race.participants?.some(
          (participant) => participant.user_id === user?.id
        );
        return { ...race, distance, isUserRegistered };
      });

      const sortedRaces = [...racesWithDistance].sort((a, b) => {
        if (!a.isUserRegistered && b.isUserRegistered) return 1;
        if (a.isUserRegistered && !b.isUserRegistered) return -1;
        if (a.status === "Open" && b.status !== "Open") return -1;
        if (a.status !== "Open" && b.status === "Open") return 1;
        if (a.available_slots > 0 && b.available_slots <= 0) return -1;
        if (a.available_slots <= 0 && b.available_slots > 0) return 1;
        return a.distance - b.distance;
      });

      setSortedByLocation(true);
      return sortedRaces;
    } catch (error) {
      console.error("Error:", error);
      setSortedByLocation(false);
      return applyFilters(races);
    }
  };
  return {
    sortRacesByDistance,
    sortedByLocation,
    setSortedByLocation,
    setDateRange,
    dateRange,
    selectedCategories,
    setSelectedCategories,
    applyFilters,
  };
};
