import { Children, lazy } from 'react';

//Dashboard
const Home = lazy(() => import('../pages/Home/Home.jsx'));
const Projects = lazy(() => import('../pages/Projects/AllProject.jsx'));
const Developers = lazy(() => import('../pages/Developers/AllDevelopers.jsx'));

const AllPagesList = [
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
    }
];
export default AllPagesList;