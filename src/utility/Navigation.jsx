import { lazy, Suspense } from "react";
import {
   BrowserRouter as Router,
   Route,
   Routes,
   Navigate,
} from "react-router-dom";
import AllPagesList from "./AllPagesList.jsx";

const Navbar = lazy(() =>
   import("../component/Navbar.jsx")
);


const Navigation = () => {;

   return (
      <Router>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
               <Route
                  path="/"
                  element={
                      <Navigate to="/home" replace />
                  }
               />

               <Route
                  path="/"
                  element={
                        <Navbar />
                  }
               >
                  {AllPagesList.map((item, index) => (
                     <Route
                        key={index}
                        path={item.path}
                        element={item.element}
                     />
                  ))}
               </Route>

               <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
         </Suspense>
      </Router>
   );
};

export default Navigation;
