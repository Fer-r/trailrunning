// import { RouterProvider } from "react-router-dom";
// import { router } from "./router";
import RaceCard from "./components/RaceCard";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import RaceList from "./components/RaceList";
import { router } from "./router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
