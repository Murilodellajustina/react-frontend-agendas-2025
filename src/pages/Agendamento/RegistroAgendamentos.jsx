import { useState, useEffect } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function CriarAgendamento() {
  const [clinicas, setClinicas] = useState([]);
  const [user, setUser] = useState(null);

  const [data_agenda, setData_agenda] = useState("");
  const [exameOuConsulta, setExameOuConsulta] = useState("");
  const [medico, setMedico] = useState("");
  const [clinica_id, setClinica_id] = useState("");
  const [estado, setEstado] = useState("d");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    api.get("/usuarios/me", { signal: controller.signal })
      .then(res => {
        const usuario = res.data;
        setUser(usuario);

        if (![0, 1, 2, 3].includes(usuario.papel)) {
          alert("Acesso negado!");
          (window.location.href = `${import.meta.env.BASE_URL}PaginaInicialAdm`);
        }
      })
      .catch(err => {
        console.error("Usuário não autenticado:", err);
        (window.location.href = `${import.meta.env.BASE_URL}`);
      });

    api.get("/clinica", { signal: controller.signal })
      .then(res => setClinicas(res.data))
      .catch(err => {
        if (err.name === "CanceledError") return;
        console.error("Erro ao buscar clínicas:", err);
      });

    return () => controller.abort();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!data_agenda || !exameOuConsulta || !medico || !clinica_id) {
      setMsg("Preencha todos os campos!");
      return;
    }

    if (!user) {
      setMsg("Usuário não autenticado.");
      return;           
    }

    try {
      const body = {
        usuarios_id: Number(user.id),
        paciente_id: null,
        exameouconsulta: exameOuConsulta,
        medico: medico,
        Clinica_id: Number(clinica_id),
        estado: estado,
        data_agenda: data_agenda
      };

      const res = await api.post("/agendamento", body);

      setMsg("Agendamento criado com sucesso!");
      setExameOuConsulta("");
      setMedico("");
      setClinica_id("");
      setData_agenda("");

      setTimeout(() => {
        (window.location.href = `${import.meta.env.BASE_URL}ListarAgendamentos`);
      }, 1500);
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      const servidorMsg = err?.response?.data?.erro || err?.response?.data || err.message;
      setMsg(`Erro ao criar agendamento: ${servidorMsg}`);
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Cadastrar Novo Agendamento</h2>

        {msg && <div className="alert alert-info">{msg}</div>}

        <form className="card p-4 shadow" onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Data e hora</label>
            <input
              type="datetime-local"
              className="form-control"
              value={data_agenda}
              onChange={(e) => setData_agenda(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Exame ou Consulta</label>
            <input
              type="text"
              className="form-control"
              value={exameOuConsulta}
              onChange={(e) => setExameOuConsulta(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Médico</label>
            <input
              type="text"
              className="form-control"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Clínica</label>
            <select
              className="form-select"
              value={clinica_id}
              onChange={(e) => setClinica_id(e.target.value)}
            >
              <option value="">Selecione uma clínica...</option>
              {clinicas.filter((c) => c.ativo).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="d">d</option>
            </select>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Criar Agendamento
          </button>
        </form>
      </div>
    </Layout>
  );
}
