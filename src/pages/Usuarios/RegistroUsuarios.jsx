import { useState, useEffect } from "react";
import { api } from "../../Services/Api";
import Layout from "../../components/Layout";

export default function CriarUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [papel, setPapel] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);

   useEffect(() => {
     const controller = new AbortController();
 
     api.get("/usuarios/me", { signal: controller.signal })
       .then(res => {
         const usuario = res.data;
         setUser(usuario);
 
         if (![0, 3].includes(usuario.papel)) {
           alert("Acesso negado!");
           window.location.href = "/PaginaInicialAdm";
         }
       })
       .catch(err => {
         console.error("Usuário não autenticado:", err);
         window.location.href = "/PaginaInicialAdm";
       });
 
 
 
     return () => controller.abort();
   }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !email || !senha || papel === "") {
      setMsg("Preencha todos os campos!");
      return;
    }

    if (senha.length < 6) {
      setMsg("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      await api.post("/usuarios", {
        nome,
        email,
        papel: Number(papel),
        senha,
        ativo: true
      });

      setMsg("Usuário criado com sucesso!");
      setNome("");
      setEmail("");
      setPapel("");
      setSenha("");

      setTimeout(() => {
        (window.location.href = `${import.meta.env.BASE_URL}ListarUsuarios`);
      }, 1500);

    } catch (error) {
      console.error("Erro ao criar usuário:", error);


      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      const msgBackend = error.response?.data?.erro || error.response?.data?.message;

      setMsg(msgBackend || "Erro ao criar usuário.");

    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">Cadastrar Novo Usuário</h2>

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
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Papel</label>
            <select
              className="form-select"
              value={papel}
              onChange={(e) => setPapel(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value={0}>Administrador</option>
              <option value={1}>Funcionário da Saúde</option>
              <option value={2}>Clínica</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Cadastrar Usuário
          </button>
        </form>
      </div>
    </Layout>
  );
}
