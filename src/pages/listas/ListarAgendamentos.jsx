import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";


export default function ListarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    api.get("/usuarios/me", { signal: controller.signal })
      .then((res) => {
        const { papel } = res.data;

        if (![0, 1, 2].includes(papel)) {
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
              <td>Clinica</td>
              <th>Paciente</th>
              <th>Estado</th>
              <th>Data Agenda</th>
              <th></th>
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
                  <td>{ag.estado}</td>
                  <td>{new Date(ag.data_agenda).toLocaleString()}</td>
                  <td>
                    {ag.estado === "d" && (
                      <button className="btn btn-primary" onClick={() => navigate(`/RegistroAgendamentoUsu/${ag.id}`)}>Agendar</button>
                    )}
                    {ag.estado === "u" && (
                      <span>Indisponível</span>
                    )}
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
