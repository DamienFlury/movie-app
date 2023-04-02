import Home from "../pages/Home";
import Movie from "../pages/Movie";

export default {
  root: "$",
  routes: [
    {
      path: "$",
      component: Home,
    },
    {
      path: "/movies/:id",
      component: Movie,
    },
  ],
};
