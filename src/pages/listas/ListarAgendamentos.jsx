import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function ListarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const controller = new AbortController();

    if (!token) {
      window.location.href = "/";
      return;
    }

    api.get("/agendamento", { signal: controller.signal })
      .then((res) => setAgendamentos(res.data))
      .catch((err) => {
        if (err.name === "CanceledError") return;
        console.error("Erro ao buscar clinicas:", err);
      });

    return () => {
      controller.abort(); 
    };
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
              <th>Paciente</th>
              <th>Estado</th>
              <th>Data Agenda</th>
            </tr>
          </thead>

          <tbody>
            {agendamentos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            ) : (
              agendamentos.map((ag) => (
                <tr key={ag.id}>
                  <td>{ag.id}</td>
                  <td>{ag.exameouconsulta}</td>
                  <td>{ag.medico}</td>
                  <td>{ag.paciente_nome}</td>
                  <td>{ag.estado}</td>
                  <td>{ag.data_agenda}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
