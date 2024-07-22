import * as React from 'react';
import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from '../layout/login';
import MainLayout from '../layout/main';
import Clientes from '../pages/clientes/clientes';


const PortalRoutes = () => {
let routes = useRoutes ( [
{
path: "/",
element: <MainLayout />, 
children: [
    { path:"fluxos", element: <Clientes />},
]
}
])
return routes;
}

export default PortalRoutes;