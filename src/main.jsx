import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages//Usuarios/Login.jsx';
import ListarAgendamentos from './pages/listas/ListarAgendamentos.jsx';
import PaginaInicialAdm from './pages/PaginaInicialAdm.jsx';
import ListarClinicas from './pages/listas/ListarClinicas.jsx';
import ListarPacientes from './pages/listas/ListarPacientes.jsx';
import ListarUsuarios from './pages/listas/ListarUsuarios.jsx';
import RegistrarUsuario from './pages/Usuarios/Registro.jsx'


const router = createBrowserRouter([
    { path: "/", element: <Login/> },
    { path: "/ListarAgendamentos", element: <ListarAgendamentos/> },
    { path: "/PaginaInicialAdm", element: <PaginaInicialAdm/> },
    { path: "/ListarClinicas", element: <ListarClinicas/> },
    { path: "/ListarUsuarios", element: <ListarUsuarios/> },
    { path: "/ListarPacientes", element: <ListarPacientes/> },        
    { path: "/Registro", element: <RegistrarUsuario/> },        
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
