import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { isAlreadyAuthenticated } from "../services/Auth";
import { useQuery } from "@tanstack/react-query";

import Login from "../pages/Login";
import Room from "../pages/Room";
import Rooms from "../pages/Rooms";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["auth"],
    queryFn: isAlreadyAuthenticated
  });

  if (isPending) return null;

  if (error) return null;

  return data ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

const RoutesPage = () => <Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<PrivateRoute element={Rooms} />} />
    <Route path="/room/:id" element={<PrivateRoute element={Room} />} />
  </Routes>
</Router>;

export default RoutesPage;