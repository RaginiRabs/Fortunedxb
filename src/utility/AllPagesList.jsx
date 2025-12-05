import { lazy } from 'react';

// Dashboard
const Home = lazy(() => import('../pages/Home/Home.jsx'));
const Projects = lazy(() => import('../pages/Projects/AllProject.jsx'));
const Developers = lazy(() => import('../pages/Developers/AllDevelopers.jsx'));
const Area = lazy(() => import('../pages/Areas/Areas.jsx'));
const ProjectDetails = lazy(() => import('../pages/Projects/ProjectDetails.jsx'));

const AllPagesList = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/projects",
    element: <Projects />
  },
  {
    path: "/developers",
    element: <Developers />
  },
  {
    path: "/areas",
    element: <Area />
  },
  // Dynamic route: /emaar-properties/the-heights-country-club
  {
    path: "/:developerSlug/:projectSlug",
    element: <ProjectDetails />
  },
];

export default AllPagesList;