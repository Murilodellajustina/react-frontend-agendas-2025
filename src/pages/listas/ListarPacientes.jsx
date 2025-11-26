import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function ListarPacientes() {
  const [paciente, setPacientes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const controller = new AbortController();

    if (!token) {
      window.location.href = "/";
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.papel !== 0  && payload.papel !== 1) {
      alert("Acesso negado! Apenas administradores ou funcionarios da saúde podem acessar esta página.");
      window.location.href = "/PaginaInicialAdm";
      return;
    }


    api.get("/paciente", { signal: controller.signal })
      .then((res) => setPacientes(res.data))
      .catch((err) => {
        if (err.name === "CanceledError") return;
        console.error("Erro ao buscar pacientes:", err);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Lista de Pacientes</h2>

        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>CPF</th>
            </tr>
          </thead>

          <tbody>
            {paciente.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            ) : (
              paciente.map((pct) => (
                <tr key={pct.id}>
                  <td>{pct.nome}</td>
                  <td>{pct.telefone}</td>
                  <td>{pct.cpf}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
