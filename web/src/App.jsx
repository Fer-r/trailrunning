// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
import RaceCard from "./components/RaceCard";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const raceExample = {
    id: 1,
    name: "Trail Example",
    release_date: "2024-05-20",
    distance_km: 21,
    location: "Granada",
    img: "https://lacasadeltrailrunning.com/wp-content/uploads/2019/12/trail-running-cosa-mi-serve.jpg"
  };
  return (
    <BrowserRouter>
      <div>
        <RaceCard {...raceExample} />
      </div>
    </BrowserRouter>
  );
};

export default App;
