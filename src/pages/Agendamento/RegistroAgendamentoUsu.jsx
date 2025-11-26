import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function RegistroAgendamentoUsu() {
  const { id } = useParams();

  const [agenda, setAgenda] = useState(null);
  const [pacientes, setPacientes] = useState([]);   
  const [pacienteSelecionado, setPacienteSelecionado] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resAgenda = await api.get(`/agendamento/${id}`);
        setAgenda(resAgenda.data);

        const resPac = await api.get("/paciente");
        setPacientes(resPac.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
      setLoading(false);
    }

    fetchData();
  }, [id]);

  async function confirmarAgendamento() {
    if (!pacienteSelecionado) {
      alert("Selecione um paciente!");
      return;
    }

    try {
      await api.put(`/agendamento/${id}`, {
        ...agenda,
        paciente_id: Number(pacienteSelecionado),
        estado: "u"
      });

      alert("Agendamento realizado com sucesso!");
      window.location.href = "/ListarAgendamentos";

    } catch (err) {
      console.error("Erro ao agendar:", err);
      alert("Erro ao agendar");
    }
  }

  if (loading) return <Layout>Carregando...</Layout>;
  if (!agenda) return <Layout>Agendamento não encontrado.</Layout>;

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Agendar Paciente</h2>

        <div className="card p-4 shadow">

          <p><strong>ID:</strong> {agenda.id}</p>
          <p><strong>Médico:</strong> {agenda.medico}</p>
          <p><strong>Consulta / Exame:</strong> {agenda.exameouconsulta}</p>
          <p><strong>Data:</strong> {agenda.data_agenda}</p>
          <p><strong>Estado atual:</strong> {agenda.estado}</p>

          <div className="mb-3 mt-4">
            <label className="form-label">Selecione o paciente:</label>

            <select
              className="form-select"
              value={pacienteSelecionado}
              onChange={(e) => setPacienteSelecionado(e.target.value)}
            >
              <option value="">Escolha um paciente...</option>

              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <button onClick={confirmarAgendamento} className="btn btn-success mt-3">
            Confirmar Agendamento
          </button>

        </div>
      </div>
    </Layout>
  );
}
