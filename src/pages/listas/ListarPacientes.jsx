import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

export default function ListarPacientes() {
  const [paciente, setPacientes] = useState([]);
  const [papel, setPapel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    api.get("/usuarios/me", { signal: controller.signal })
      .then((res) => {
        const { papel } = res.data;
        setPapel(papel);

        if (![0, 1, 3].includes(papel)) {
          alert("Acesso negado!");
          navigate("/PaginaInicialAdm");
          return;
        }

        return api.get("/paciente", { signal: controller.signal });
      })
      .then((res) => {
        if (res) setPacientes(res.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
          navigate("/");
        }
      });

    return () => controller.abort();
  }, []);

  async function inativarPaciente(id) {

    try {
      await api.patch(`/paciente/${id}/ativo`, {
        ativo: false
      });
      alert("Excluido com sucesso!");
      setPacientes((prev) => prev.filter((pct) => pct.id !== id));
      navigate("/ListarPacientes");
    } catch (err) {
      console.error("Erro ao exlcluir!:", err.response?.data || err);
      alert("Erro ao excluir paciente");
    }
  }

  async function ativarPaciente(id) {

    try {
      await api.patch(`/paciente/${id}/ativo`, {
        ativo: true
      });
      alert("Ativado com sucesso!");
      setPacientes((prev) => prev.filter((pct) => pct.id !== id));
      navigate("/ListarPacientes");
    } catch (err) {
      console.error("Erro ao exlcluir!:", err.response?.data || err);
      alert("Erro ao excluir paciente");
    }
  }

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
              <th>Excluir Paciente</th>
            </tr>
          </thead>

          <tbody>
            {paciente.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            ) : papel !== 3 ? (
              paciente.filter((pct) => pct.ativo).map((pct) => (
                <tr key={pct.id}>
                  <td>{pct.nome}</td>
                  <td>{pct.telefone}</td>
                  <td>{pct.cpf}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => inativarPaciente(pct.id)}
                      disabled={papel === 2}
                    >
                      Inativar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              paciente.map((pct) => (
                <tr key={pct.id}>
                  <td>{pct.nome}</td>
                  <td>{pct.telefone}</td>
                  <td>{pct.cpf}</td>
                  <td>
                    {pct.ativo ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => inativarPaciente(pct.id)}
                      >
                        Inativar
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => ativarPaciente(pct.id)}
                      >
                        Ativar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
