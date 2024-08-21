import { useEffect } from 'react'
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from 'react-router-dom';
import {toast} from 'react-toastify'


import Login from '../pages/Login/Login';
import Room from '../pages/Room/Room'
import Rooms from '../pages/Rooms/Rooms';
import {isAlreadyAuthenticated} from '../services/Auth'
import { socket } from '../services/Auth';


const PrivateRoute = ({ component: Component, ...rest}) => {
    const isAuthenticatedLocal = isAlreadyAuthenticated()

    return isAuthenticatedLocal ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
}

export default function RoutesPage() {

    useEffect(() => {
        socket.on('errorMessage', data => {
            toast.error(data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        })
        socket.on('eventMessage', data => {
            toast.info(data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        })
        socket.on('myIP', data => {
            localStorage.setItem("IP", JSON.stringify(data))
        })
        return () => {
            socket.off('myIP')
            socket.off('errorMessage')
            socket.off('eventMessage')
        }
    },[])

    return (
        <Router>
            <Switch>
                <Route path="/login" element={<Login />} />;
                <Route path="/" element={< PrivateRoute component={Rooms} />} />;
                <Route path="/room/:id" element={< PrivateRoute component={Room}  />} />;
            </Switch>
        </Router>
    )
}