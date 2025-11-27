import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login } from "../../Services/Api";
import logoImg from "../../Imagens/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
  const navigate = useNavigate(); 

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      await login(email, senha);

      const csrf = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf_token="))
        ?.split("=")[1];

      if (!csrf) {
        setErro("Erro CSRF: cookie não encontrado");
        return;
      }

      sessionStorage.setItem("csrf_token", csrf);

      navigate("/paginaInicialAdm");

    } catch (err) {
      setErro("Email ou senha incorretos");
      console.error(err);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-4">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="d-block mx-auto mb-4" 
            style={{ maxWidth: "300px" }} 
          />
          <h2 className="text-center mb-4">Login</h2>

          {erro && <div className="alert alert-danger text-center" role="alert">{erro}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                Entrar
                </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}