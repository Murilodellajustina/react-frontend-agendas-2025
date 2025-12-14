import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages//Usuarios/Login.jsx';
import ListarAgendamentos from './pages/listas/ListarAgendamentos.jsx';
import PaginaInicialAdm from './pages/PaginaInicialAdm.jsx';
import ListarClinicas from './pages/listas/ListarClinicas.jsx';
import ListarPacientes from './pages/listas/ListarPacientes.jsx';
import ListarUsuarios from './pages/listas/ListarUsuarios.jsx';
import RegistrarUsuario from './pages/Usuarios/RegistroUsuarios.jsx'
import RegistrarAgendamento from './pages/Agendamento/RegistroAgendamentos.jsx'
import RegistrarClinica from './pages/Clinica/RegistroClinica.jsx';
import RegistrarPaciente from './pages/Paciente/RegistroPaciente.jsx';
import RegistrarAgendamentoUsu from './pages/Agendamento/RegistroAgendamentoUsu.jsx'


const router = createHashRouter([
    { path: "/", element: <Login /> },
    { path: "/ListarAgendamentos", element: <ListarAgendamentos /> },
    { path: "/PaginaInicialAdm", element: <PaginaInicialAdm /> },
    { path: "/ListarClinicas", element: <ListarClinicas /> },
    { path: "/ListarUsuarios", element: <ListarUsuarios /> },
    { path: "/ListarPacientes", element: <ListarPacientes /> },
    { path: "/RegistroUsuarios", element: <RegistrarUsuario /> },
    { path: "/RegistroAgendamento", element: <RegistrarAgendamento /> },
    { path: "/RegistroClinica", element: <RegistrarClinica /> },
    { path: "/RegistroPaciente", element: <RegistrarPaciente /> },
    { path: "/RegistroAgendamentoUsu/:id", element: <RegistrarAgendamentoUsu /> },

],
  );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);