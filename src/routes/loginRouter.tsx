import * as React from 'react';
import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from '../layout/login';
import MainLayout from '../layout/main';


const LoginRoutes = () => {
let routes = useRoutes ( [
{
    path: "/",
    element: <Login />
}
])
return routes;
}

export default LoginRoutes;