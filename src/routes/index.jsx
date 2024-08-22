import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../pages/Login/Login";
import Room from "../pages/Room/Room";
import Rooms from "../pages/Rooms/Rooms";
import { isAlreadyAuthenticated, socket } from "../services/Auth";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await isAlreadyAuthenticated();
      setIsAuthenticated(result);
    };
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default function RoutesPage() {
  useEffect(() => {
    socket.on("errorMessage", (data) => {
      toast.error(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
    socket.on("eventMessage", (data) => {
      toast.info(data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
    return () => {
      socket.off("errorMessage");
      socket.off("eventMessage");
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={Rooms} />} />
        <Route path="/room/:id" element={<PrivateRoute element={Room} />} />
      </Routes>
    </Router>
  );
}
