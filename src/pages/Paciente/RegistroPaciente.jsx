import { useState, useEffect } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

function formatCPF(valor) {
  let v = valor.replace(/\D/g, "");

  if (v.length > 11) v = v.slice(0, 11);

  if (v.length > 9) {
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  }
  else if (v.length > 6) {
    v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  }
  else if (v.length > 3) {
    v = v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  }

  return v;
}

function formatTelefone(valor) {
  let v = valor.replace(/\D/g, "");
  if (v.length > 11) v = v.slice(0, 11);

  if (v.length <= 10) {
    v = v.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, ddd, p1, p2) => {
      let out = "";
      if (ddd) out += `(${ddd}`;
      if (ddd && ddd.length === 2) out += ") ";
      if (p1) out += p1;
      if (p2) out += "-" + p2;
      return out;
    });
  } else {
    v = v.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, ddd, p1, p2) => {
      let out = "";
      if (ddd) out += `(${ddd}`;
      if (ddd && ddd.length === 2) out += ") ";
      if (p1) out += p1;
      if (p2) out += "-" + p2;
      return out;
    });
  }

  return v;
}

export default function CriarUsuario() {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);
  const [papel, setPapel] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    api.get("/usuarios/me", { signal: controller.signal })
      .then(res => {
        const usuario = res.data;
        setUser(usuario);

        if (![0, 1, 3].includes(usuario.papel)) {
          alert("Acesso negado!");
          window.location.href = "/PaginaInicialAdm";
        }
      })
      .catch(err => {
        if (err.name === "CanceledError") return;
        console.error("Usuário não autenticado:", err);
        window.location.href = "/PaginaInicialAdm";
      });

    return () => controller.abort();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !cpf || !telefone) {
      setMsg("Preencha todos os campos!");
      return;
    }

    const telSemMascara = telefone.replace(/\D/g, "");
    const cpfSemMascara = cpf.replace(/\D/g, "");

    try {
      await api.post("/paciente", {
        nome,
        cpf: cpfSemMascara,
        telefone: telSemMascara,
        ativo: true
      });

      setMsg("Paciente criado com sucesso!");
      setNome("");
      setCPF("");
      setTelefone("");


    } catch (error) {
      console.error(error);
      setMsg("Erro ao criar paciente.");
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
              type="text"
              className="form-control"
              value={cpf}
              onChange={(e) => setCPF(formatCPF(e.target.value))}
              placeholder="000.000.000-00"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input
              type="text"
              className="form-control"
              value={telefone}
              onChange={(e) => setTelefone(formatTelefone(e.target.value))}
              placeholder="(00) 00000-0000"
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
