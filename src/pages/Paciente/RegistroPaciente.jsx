import { useState, useEffect } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function CriarUsuario() {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.papel !== 0 && payload.papel !== 2) {
      alert("Acesso negado! Apenas administradores e Funcionarios da saude podem acessar esta página.");
      window.location.href = "/PaginaInicialAdm";
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !cpf || !telefone) {
      setMsg("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/paciente", {
        nome,
        cpf,
        telefone
      });

      setMsg("Paciente criado com sucesso!");
      setNome("");
      setCPF("");
      setTelefone("");

      setTimeout(() => {
        window.location.href = "/ListarPacientes";
      }, 1500);

    } catch (error) {
      console.error(error);
      setMsg("Erro ao criar clinica.");
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Cadastrar Novo Paciente</h2>

        {msg && <div className="alert alert-info">{msg}</div>}

        <form className="card p-4 shadow" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">CPF</label>
            <input
              type="CPF"
              className="form-control"
              value={cpf}
              onChange={(e) => setCPF(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input
              type="telefone"
              className="form-control"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Cadastrar Paciente
          </button>
        </form>
      </div>
    </Layout>
  );
}
