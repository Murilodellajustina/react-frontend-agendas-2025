import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

export default function ListarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();
  const [papel, setPapel] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    api
      .get("/usuarios/me", { signal: controller.signal })
      .then((res) => {
        const { papel, id } = res.data;

        setPapel(papel);
        setUsuarioId(id);

        if (![0, 1, 2, 3].includes(papel)) {
          alert("Acesso negado!");
          window.location.href = "/PaginaInicialAdm";
          return;
        }

        return api.get("/agendamento", { signal: controller.signal });
      })
      .then((res) => {
        if (res) setAgendamentos(res.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
          window.location.href = "/";
        }
      });

    return () => controller.abort();
  }, []);

  async function cancelarAgendamento(id) {
    try {
      await api.put(`/agendamento/${id}`, {
        paciente_id: null,
        estado: "d",
      });

      alert("Cancelado com sucesso!");
      window.location.href = "/ListarAgendamentos";
    } catch (err) {
      console.error("Erro ao cancelar:", err.response?.data || err);
      alert("Erro ao cancelar agendamento");
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Lista de Agendamentos</h2>

        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Exame / Consulta</th>
              <th>Médico</th>
              <th>Clinica</th>
              <th>Paciente</th>
              <th>Data Agenda</th>
              <th>Agendar</th>
              <th>Cancelar</th>
            </tr>
          </thead>

          <tbody>
            {agendamentos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Carregando...
                </td>
              </tr>
            ) : (
              agendamentos.map((ag) => (
                <tr key={ag.id}>
                  <td>{ag.id}</td>
                  <td>{ag.exameouconsulta}</td>
                  <td>{ag.medico}</td>
                  <td>{ag.clinica_nome}</td>
                  <td>{ag.paciente_nome}</td>
                  <td>{new Date(ag.data_agenda).toLocaleString()}</td>
                  <td>
                    {ag.estado === "d" && (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/RegistroAgendamentoUsu/${ag.id}`)
                        }
                        disabled={papel === 2}
                      >
                        Agendar
                      </button>
                    )}
                    {ag.estado === "u" && <span>Indisponível</span>}
                  </td>
                  <td>
                    {ag.paciente_id !== null &&
                      (ag.usuarios_id === usuarioId || (papel === 0 || papel === 3)) && (
                        <button
                          className="btn btn-danger"
                          onClick={() => cancelarAgendamento(ag.id)}
                        >
                          Cancelar
                        </button>
                      )}
                    {ag.paciente_id === null && <span>--</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
