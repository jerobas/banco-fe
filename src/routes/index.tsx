import { Navigate, Route, Routes } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Login from "../pages/Login";
import Room from "../pages/Room";
import Rooms from "../pages/Rooms";
import { isAlreadyAuthenticated } from "../services/Auth";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["auth"],
    queryFn: isAlreadyAuthenticated,
  });

  if (isPending) return null;

  if (error) return null;
  return data ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute element={Rooms} />} />
      <Route path="/room/:id" element={<PrivateRoute element={Room} />} />
    </Routes>
  );
};

export default RoutesPage;
