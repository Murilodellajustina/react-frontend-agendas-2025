import logo from "../Imagens/logo.png";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "200px", height: "70px", borderRadius: "30px" }}
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
              <a className="nav-link" href="/PaginaInicialAdm">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ListarAgendamentos">Agendamentos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ListarPacientes">Pacientes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ListarUsuarios">Usuarios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Login</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
