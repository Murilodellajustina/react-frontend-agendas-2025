import logo from "../Imagens/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../Services/Api";

export default function Header() {
  const [papel, setPapel] = useState(null);

useEffect(() => {
  api.get("/usuarios/me")
    .then(res => {
      setPapel(res.data.papel);
    })
    .catch(err => {
      console.error("Usuário não autenticado:", err);
      window.location.href = "/";
    });
}, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <a className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "200px", height: "50px", borderRadius: "30px" }}
            className="me-2"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/PaginaInicialAdm">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/ListarAgendamentos">Agendamentos</Link>
            </li>
            {papel === 0 && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/ListarPacientes">Pacientes</Link>
              </li>
            )}
            {papel === 1 && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/ListarPacientes">Pacientes</Link>
              </li>
            )}
            {papel === 0 && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/ListarUsuarios">Usuários</Link>
              </li>
            )}
                        {papel === 1 && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/ListarClinicas">Clinicas</Link>
              </li>
            )}
            {papel === 0 && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/ListarClinicas">Clinicas</Link>
              </li>
            )}
            <li className="nav-item">
              <a
                className="nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
