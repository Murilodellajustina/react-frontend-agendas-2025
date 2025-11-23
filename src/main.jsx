import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login.jsx'

import ListarAgendamentos from './pages/listas/ListarAgendamentos.jsx';

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/ListarAgendamentos", element: <ListarAgendamentos/> },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
